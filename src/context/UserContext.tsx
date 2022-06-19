
import { createContext } from "react";
export interface UserContextInterface {
  userLoading: boolean;
  userFirstName: string;
  userFullName: string;
  userEmail: string;
  userPhoto: string;
  userToken: string;
};

export const UserContext = createContext({} as UserContextInterface);