import { Dimensions, FlatList, Image, Linking, ScrollView, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import { IPodcast } from '../models'

const screenSize = Dimensions.get('screen');

interface IProps {
  podcast: IPodcast[]
}

export const CardPodcast = ({ podcast }: IProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <FlatList
        data={podcast}
        renderItem={({ item }) =>
          <TouchableOpacity style={{
            marginVertical: screenSize.height * 0.01
          }}
            activeOpacity={0.7}
            onPress={() => {
              Linking.openURL(item.url)
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: screenSize.fontScale * 23 }}>{item.titulo}</Text>
            <Image source={{ uri: item.imagen }} style={{ height: screenSize.height * 0.3, width: screenSize.width * 0.95, marginVertical: screenSize.height * 0.01 }} />

          </TouchableOpacity>}
      />
    </View>
  )
}

