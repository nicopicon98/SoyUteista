import {FC} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

interface ImageBackgroundCarnetProps {
  children: JSX.Element | JSX.Element[];
}

export const ImageBackgroundCarnet = ({children}: ImageBackgroundCarnetProps) => {
  const imageBackground: string = '@resources/Images/carnetFondo.jpg';

  return (
    <ImageBackground
      source={require(imageBackground)}
      resizeMode="cover"
      style={styles.image}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingTop: 0,
  },
});
