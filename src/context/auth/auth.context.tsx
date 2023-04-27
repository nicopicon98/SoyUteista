import { AuthManager, CarnetManager, User } from '@src/services';
import { createContext, useEffect, useReducer } from 'react';
import { ICarnetResp, IUserAuthResponse } from '@src/models';
import { authReducer, IAuthState } from './auth.reducer';
import { ImageSourcePropType } from 'react-native';
import { Capitalize } from '@src/utilities';
import { useSnackbar } from '../snackbar';
import jwt_decode from 'jwt-decode';

//Lo que se pasara desde el arbol principal
export interface IAuthContextProps {
  authState: IAuthState;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

//initial State
const authInitialState: IAuthState = {
  status: 'checking',
  user: null,
  token: null,
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const { showMessage } = useSnackbar();


  useEffect(() => {
    checkToken();
    // console.log("Desde AuthContext");
  }, [])

  //Revisamos aca en el context si ya tiene token
  const checkToken = async () => {
    //Nos traemos el token del async storage
    const token = await AuthManager.getAccessTokenAsync();
    //Lo pintamos
    // console.log(tokenReceived);
    //No token, no autenticado
    if (!token) return dispatch({ type: 'notAuthenticated' })
    //Hay token
    try {
      const rep = await authValidatorRole(token!);
      if (rep.user!.userResult !== 2 && rep.user!.userResult !== 69) {
        dispatch({ type: 'signIn', payload: { token: rep.token!, user: rep.user! } })
      }
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
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
      // console.log(error);
    }
  }

  //validate if student or not
  const authValidatorRole = async (token: string): Promise<IAuthState> => {
    let studentPhoto: ImageSourcePropType;
    let dataValue: ICarnetResp;
    const user: IUserAuthResponse = jwt_decode(token);

    try {
      dataValue = await CarnetManager.getCarnet(user.upn);
      console.log(dataValue, "dataValue")
      studentPhoto = await User.getUserPhoto();
    } catch (error) {
      studentPhoto = require('@src/resources/Images/male-placeholder.jpeg');
    }
    const res = {
      ...state,
      token,
      user: {
        userResult: dataValue!.result,
        userError: dataValue!.error,
        userFirstName: Capitalize(user.given_name),
        userFullName: Capitalize((user.name).replace(/\s+/g, ' ')),
        userEmail: user.upn,
        userPhoto: studentPhoto,
        userMoreInfo: dataValue!.data
      }
    }
    return res
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