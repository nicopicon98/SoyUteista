import { AppBarComponent } from '../../components/app-bar';
import Video from 'react-native-video';

export const ExitoEscolarScreen = () => {
  return (
    <>
      <AppBarComponent title="Exito Escolar" />
      <Video
        source={{
          uri: 'http://edge.teveo.com.co/live/AeAAAgAaAANCA1IAyADIVKwAAAAAAAAAAmOnOAqnAD7PAAAA/playlist.m3u8',
        }}
        rate={1.0}
        playInBackground
        volume={1.0}
        style={{ width: 300, height: 300, marginTop: 100, borderWidth: 10 }}
      />
    </>
  );
};
