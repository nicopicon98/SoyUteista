import React from 'react'
import { View } from 'react-native-animatable'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppBarComponent from '../components/app-bar/app-bar.component'
import CardsDirectorioEscolar from '../components/cards-directorio-escolar/cards-directorio-escolar.component'

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