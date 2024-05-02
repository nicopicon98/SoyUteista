import { ICarnet } from './';
import { ImageSourcePropType } from 'react-native';
export interface IUser {
  userResult: number;
  userError: string;
  userFirstName: string;
  userFullName: string;
  userEmail: string;
  userPhoto: ImageSourcePropType;
  userMoreInfo: ICarnet;
  userMoreInfo2: ICarnet[];
};