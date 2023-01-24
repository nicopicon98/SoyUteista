import { ImageBackground, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const AuthLoadingScreen = () => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@resources/Images/loginBackground.jpg')}
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
