import { Carnet } from '.';
export interface User {
  userResult      : number;
  userError       : string;
  userFirstName   : string;
  userFullName    : string;
  userEmail       : string;
  userPhoto       : string;
  userPhotoError  : boolean;
  userMoreInfo    : Carnet;
};