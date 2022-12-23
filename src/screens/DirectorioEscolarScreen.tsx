import React from 'react'
import { View } from 'react-native-animatable'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppBarComponent from '../components/AppBarComponent'
import CardsDirectorioEscolar from '../components/CardsDirectorioEscolar'

const DirectorioEscolarScreen = () => {
  const {bottom} = useSafeAreaInsets()
  return (
    <>
    <AppBarComponent title='Directorio Escolar'/>
    <View style={{flex: 1, marginBottom: bottom}}>
      <CardsDirectorioEscolar/>
    </View>
    </>
  )
}

export default DirectorioEscolarScreen