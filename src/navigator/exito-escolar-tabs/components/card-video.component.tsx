import React from 'react'
import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { Video } from '../models'
import { WebView } from 'react-native-webview';

const screenSize = Dimensions.get('screen');
interface Props {
  videos: Video[]
}

export const CardVideo = ({ videos }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <FlatList
        data={videos}
        renderItem={({ item }) => <WebView
          style={{ height: screenSize.height * 0.3, width: screenSize.width * 0.95, marginVertical: screenSize.height * 0.01 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: 'https://www.youtube.com/embed/' + item.url }}
        />}
      />
    </View>
  )
}
