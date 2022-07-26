import React, { createContext, useEffect, useReducer } from 'react';

import jwt_decode from 'jwt-decode';
import carnetAPI from '../api/carnetAPI';

import { CarnetInterface } from '../interfaces/CarnetInterface';
import { UserAuthResponse } from '../interfaces/AuthUserInterface';
import { blobToBase64 } from '../helpers/blobToBase64';
import { Capitalize } from '../helpers/Capitalize';
import { AuthManager } from '../auth/AuthManager';
import { authReducer, AuthState } from './authReducer';
import { GraphManager } from '../graph/GraphManager';

//Lo que se pasara desde el arbol principal
export interface AuthContextProps {
  authState: AuthState;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

//initial State
const authInitialState: AuthState = {
  status: 'checking',
  user: null,
  token: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer(authReducer, authInitialState);


  useEffect(() => {
    checkToken();
    console.log("Desde AuthContext");
  }, [])

  //Revisamos aca en el context si ya tiene token
  const checkToken = async () => {
    //Nos traemos el token del async storage
    const tokenReceived = await AuthManager.getAccessTokenAsync();
    //Lo pintamos
    console.log(tokenReceived);
    //No token, no autenticado
    if (!tokenReceived) return dispatch({ type: 'notAuthenticated' })
    //Hay token
    try {
      const rep = await authValidatorRole(tokenReceived!);
      if (rep.user!.userResult !== 2 && rep.user!.userResult !== 69) {
        dispatch({ type: 'signIn', payload: { token: rep.token!, user: rep.user! } })
      }
    } catch (error) {
      // it will go in catch block only if response has error status code like 503 (internal server error), 400 (bad request)
      return dispatch({ type: 'notAuthenticated' })
    }
  }



  //Two options, or no matriculado or matriculado
  const signIn = async () => {
    try {
      //Guarda token
      await AuthManager.signInAsync();
      //leemos token
      const tokenReceived = await AuthManager.getAccessTokenAsync();
      //A este punto, ya tenemos el token, ahora evaluamos respuesta de perfil
      const rep = await authValidatorRole(tokenReceived!);
      if (rep.user!.userResult !== 2 && rep.user!.userResult !== 69) {
        dispatch({ type: 'signIn', payload: { token: rep.token!, user: rep.user! } })
      }
    } catch (error) {
      console.log("error aqui -> " + error);
    }
  }

  //Just signOut
  const signOut = async () => {
    try {
      await AuthManager.signOutAsync();
      dispatch({ type: 'logOut' });
    } catch (error) {
      console.log(error);
    }
  }

  //validate if student or not
  const authValidatorRole = async (token: string): Promise<AuthState> => {
    const API_KEY = "JSPHPWORKS4everandever!";
    const user: UserAuthResponse = jwt_decode(token);
    const { data } = await carnetAPI.get<CarnetInterface | null>(`/carnet/?email=${user.upn}&key=${API_KEY}`);
    let photo: string = "";
    let userPhotoError: boolean = false;
    try {
      const userImage: Blob = await GraphManager.getPhotoAsync();
      const answerBase64: any = await blobToBase64(userImage);
      const Fullphoto: string[] = answerBase64.split(',');
      photo = Fullphoto[1];
    } catch (error) {
      userPhotoError = true;
      photo = "https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg";
    }

    return {
      ...state,
      token,
      user: {
        userResult: data!.result,
        userError: data!.error,
        userFirstName: Capitalize(user.given_name),
        userFullName: Capitalize((user.name).replace(/\s+/g, ' ')),
        userEmail: user.upn,
        userPhoto: photo,
        userPhotoError,
        userMoreInfo: data!.data
      }
    }

  }

  return (
    <AuthContext.Provider value={{
      authState: { ...state },
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )

}