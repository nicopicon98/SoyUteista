import { UserContextInterface } from "../interfaces/UserContextInterface";


export type AuthState = {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: UserContextInterface | null;
  token: string | null;
}

type AuthAction =
  | { type: 'signIn', payload: { token: string, user: UserContextInterface } }
  | { type: 'notAuthenticated' } //esta accion se dispara revisando el token y falla
  | { type: 'logOut' }

export const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
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