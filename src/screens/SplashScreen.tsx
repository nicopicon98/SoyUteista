import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { NavigationProps } from '../types/navigation';

export const AuthLoadingScreen = () => {

  const imageBackground: string = "../resources/Images/loginBackground.jpg";

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(imageBackground)}
        resizeMode="cover"
        style={styles.image}
      >
        <Animatable.Image
          animation="fadeInUp"
          iterationCount={1}
          direction="alternate"
          source={require('@resources/Images/Logo.png')}
          resizeMode='contain'
          style={styles.imageDimension}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusText: {
    marginTop: 10,
  },
  imageDimension: {
    width: 200,
    height: 200
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
});
