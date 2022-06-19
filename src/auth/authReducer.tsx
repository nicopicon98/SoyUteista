import { AuthState } from '../interfaces/AuthStateInterface';


type AuthAction =
  { type: 'RESTORE_TOKEN', token: string | null; }
  | { type: 'SIGN_IN', token: string | null; }
  | { type: 'SIGN_OUT' }

export const authReducer = (prevState: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignOut: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignOut: true,
        userToken: null,
      };
  }
}