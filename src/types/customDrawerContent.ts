import { DrawerContentComponentProps } from '@react-navigation/drawer';

export type CustomDrawerContentProps = DrawerContentComponentProps & {
  userName: string;
  userEmail: string;
  userPhoto: string;
  height?: number;
};