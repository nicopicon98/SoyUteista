import { CardsDirectorioEscolar } from './components/cards-directorio-escolar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppBarComponent } from '@src/components/app-bar'
import { View } from 'react-native-animatable'

export const DirectorioEscolarScreen = () => {
  const { bottom } = useSafeAreaInsets()
  return (
    <>
      <AppBarComponent title='Directorio Escolar' />
      <View style={{ flex: 1, marginBottom: bottom }}>
        <CardsDirectorioEscolar />
      </View>
    </>
  )
}