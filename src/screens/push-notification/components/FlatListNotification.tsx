import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CardNotification from './CardNotification'

interface Props {
  notifications: any
}

const screenSize = Dimensions.get('screen')
const FlatListNotification = ({ notifications }: Props) => {

  const { top, bottom } = useSafeAreaInsets()
  return (<View style={{ flex: 1, marginTop: top }}>
    <Text style={{ fontSize: screenSize.fontScale * 26, color: 'black', marginHorizontal: screenSize.width * 0.02, marginTop: screenSize.height * 0.02 }}>Últimas notificaciones Institucionales</Text>
    <FlatList
      data={notifications}
      renderItem={({ item }) => <CardNotification notification={item} />}
      style={{ marginTop: 10 }}
    />
  </View>
  )
}

export default FlatListNotification
