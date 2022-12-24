import React from 'react';
import AppBarComponent from '../components/AppBarComponent';
import Video from 'react-native-video';
import {StyleSheet} from 'react-native';
const ExitoEscolarScreen = () => {
  const imageBackground: string = '../resources/aa.m3u';
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
        style={{width: 300, height: 300, marginTop: 100, borderWidth: 10}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 500,
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 10,
  },
});

export default ExitoEscolarScreen;
