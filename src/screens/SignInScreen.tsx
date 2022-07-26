import React, { useContext, useEffect } from 'react';
import { Button, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import { colores } from '../theme/appTheme';
import { NavigationProps } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';

export const SignInScreen = ({ navigation }: NavigationProps) => {

  const { signIn, authState: { user } } = useContext(AuthContext);

  const signInAsync = async () => {
    await signIn();
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@resources/Images/Logo.png')}
        resizeMode='contain'
        style={styles.profilePhoto}
      />
      {
        // loading
        //   ?
        //   <ActivityIndicator color={colores.Pantone_382_C} size='large' />
        //   :
        <Button onPress={signInAsync} color={colores.Pantone_382_C} title='iniciar sesión' />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: colores.Pantone_382_C,
    padding: 10,
    borderRadius: 10
  },
  textLoginButton: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  borderRadius: {
    borderRadius: 100
  },
  profilePhoto: {
    width: 240,
    height: 240,
  },
});