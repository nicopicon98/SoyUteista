import React, { createContext, useEffect, useReducer } from 'react';
import { AuthManager, getCarnet, GraphManager } from '@src/services';
import { blobToBase64, Capitalize } from '@src/utilities';
import { authReducer, AuthState } from './auth.reducer';
import { UserAuthResponse } from '@src/models';
import { API_KEY } from '@src/config/auth';
import jwt_decode from 'jwt-decode';

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
    await AuthManager.signInAsync();
    //leemos token
    const tokenReceived = await AuthManager.getAccessTokenAsync();
    //A este punto, ya tenemos el token, ahora evaluamos respuesta de perfil
    const rep = await authValidatorRole(tokenReceived!);
    if (rep.user!.userResult !== 2 && rep.user!.userResult !== 69) {
      dispatch({ type: 'signIn', payload: { token: rep.token!, user: rep.user! } })
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
    const user: UserAuthResponse = jwt_decode(token);
    const { data } = await getCarnet(user.upn, API_KEY);
    let photo: string = "";
    let userPhotoError: boolean = false;
    try {
      const userImage: Blob = await GraphManager.getPhotoAsync();
      const answerBase64: any = await blobToBase64(userImage);
      const Fullphoto: string[] = answerBase64.split(',');
      console.log(Fullphoto)
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