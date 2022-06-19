import { createContext } from 'react';
import { AuthState } from '../interfaces/AuthStateInterface';

export interface AuthContextProps {
  authState: AuthState;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextProps);