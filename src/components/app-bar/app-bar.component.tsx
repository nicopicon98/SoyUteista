import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { colores } from '../../theme';

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
      <Appbar.Action icon="bell" onPress={() => { }} color={'white'} />
    </Appbar.Header>
  );
};