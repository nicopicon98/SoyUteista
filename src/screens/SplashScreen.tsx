import React, { useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';
import { NavigationProps } from '../types/navigation';
import * as Animatable from 'react-native-animatable';

const AuthLoadingScreen = ({ navigation }: NavigationProps) => {

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [])

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeInUp"
        iterationCount={1}
        direction="alternate"
        source={require('@resources/Images/Logo.png')}
        resizeMode='contain'
        style={styles.imageDimension}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 10,
  },
  imageDimension: {
    width: 200,
    height: 200
  }
});

export default AuthLoadingScreen;