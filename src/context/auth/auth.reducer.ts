import { IUser } from "@src/models";


export interface IAuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: IUser | null;
  token: string | null;
}

type AuthAction =
  | { type: 'signIn', payload: { token: string, user: IUser } }
  | { type: 'notAuthenticated' } //esta accion se dispara revisando el token y falla
  | { type: 'logOut' }

export const authReducer = (prevState: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...prevState,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token
      };
    case 'logOut':
    case 'notAuthenticated':
      return {
        ...prevState,
        status: 'not-authenticated',
        token: null
      };
    default:
      return prevState;
  }
}