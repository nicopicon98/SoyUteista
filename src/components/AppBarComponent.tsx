import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import { colores } from '../theme/appTheme';

interface Props {
  title: string;
}

const AppBarComponent = (props: Props) => {

  const navigate = useNavigation();
  const openMenu = () => {
    navigate.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Appbar.Header
    style={{
      backgroundColor: colores.Pantone_382_C
    }}
    >
      <Appbar.BackAction onPress={() => openMenu()}  color={'white'}/>
      <Appbar.Content title={props.title} color={'white'} />
      <Appbar.Action icon="bell" onPress={() => {}} color={'white'} />
    </Appbar.Header>
  );
};

export default AppBarComponent;
