import { ListConvocatorias } from './components/list-convocatorias';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { AppBarComponent } from '../../components/app-bar';
import {View} from 'react-native-animatable';

export const ConvocatoriasScreen = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <AppBarComponent title="Convocatorias" />
      <View
        style={{
          flex: 1,
          marginBottom: bottom,
          backgroundColor: 'white'
        }}>
          <ListConvocatorias/>
        </View>
    </>
  );
};
