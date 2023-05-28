import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ImageSourcePropType } from 'react-native';

export type CustomDrawerContentProps = DrawerContentComponentProps & {
  darkMode?: string | null;
};