import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ImageSourcePropType } from 'react-native';

export type CustomDrawerContentProps = DrawerContentComponentProps & {
  userName: string;
  userEmail: string;
  userPhoto: ImageSourcePropType;
  userResult: number;
  height?: number;
  darkMode?: string | null;
  userFranDesc: string;
};