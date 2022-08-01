import { DrawerContentComponentProps } from '@react-navigation/drawer';

export type CustomDrawerContentProps = DrawerContentComponentProps & {
  userName        : string;
  userEmail       : string;
  userPhoto       : string;
  userPhotoError  : boolean;
  userResult      : number;
  height?         : number;
  darkMode        : string | null | undefined;
};