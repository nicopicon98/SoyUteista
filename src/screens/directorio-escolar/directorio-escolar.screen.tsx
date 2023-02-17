import { CardsDirectorioEscolar } from './components/cards-directorio-escolar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppBarComponent } from '@src/components/app-bar'
import { View } from 'react-native-animatable'
import { Text } from 'react-native';
import { useDirectorioEscolar } from './hooks';
import { ActivityIndicator } from 'react-native-paper';

export const DirectorioEscolarScreen = () => {
  const { bottom } = useSafeAreaInsets()
  const { directories, isLoading } = useDirectorioEscolar();
  return (
    <>
      <AppBarComponent title='Directorio Institucional' />
      <View style={{ flex: 1, marginBottom: bottom }}>
        <CardsDirectorioEscolar />
      </View>
    </>
  )
}