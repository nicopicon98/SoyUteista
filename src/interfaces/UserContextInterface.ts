import { Carnet } from "./CarnetInterface";

export interface UserContextInterface {
  userResult      : number;
  userError       : string;
  userFirstName   : string;
  userFullName    : string;
  userEmail       : string;
  userPhoto       : string;
  userPhotoError  : boolean;
  userMoreInfo    : Carnet;
};