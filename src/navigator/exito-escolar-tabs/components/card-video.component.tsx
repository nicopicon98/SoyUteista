import { Dimensions, FlatList, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { IVideo } from '../models';

const screenSize = Dimensions.get('screen');
interface IProps {
  videos: IVideo[]
}

export const CardVideo = ({ videos }: IProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <FlatList
        data={videos}
        renderItem={({ item }) =>
          <WebView
            style={{ height: screenSize.height * 0.3, width: screenSize.width * 0.95, marginVertical: screenSize.height * 0.01 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: 'https://www.youtube.com/embed/' + item.url }}
          />}
      />
    </View>
  )
}
