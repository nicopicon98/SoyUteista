import { ICarnet } from './';
export interface IUser {
  userResult: number;
  userError: string;
  userFirstName: string;
  userFullName: string;
  userEmail: string;
  userPhoto: string;
  userPhotoError: boolean;
  userMoreInfo: ICarnet;
};