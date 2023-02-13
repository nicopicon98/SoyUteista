import { DrawerActions, useNavigation } from '@react-navigation/native';
import { colores } from '@src/theme';
import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
}

export const AppBarComponent = (props: Props) => {
  const navigate = useNavigation();
  const openMenu = () => {
    navigate.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Appbar.Header
      style={{
        backgroundColor: colores.Pantone_382_C,
      }}>
      <Appbar.Action
        onPress={() => openMenu()}
        color={'white'}
        icon={'menu'}
        size={30}
      />
      <Appbar.Content title={props.title} color={'white'} />
      <Appbar.Action icon="bell" onPress={() => { navigate.navigate('PushNotification' as never) }} color={'white'} />
    </Appbar.Header>
  );
};