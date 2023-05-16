import { StyleSheet, View, ActivityIndicator, ImageBackground, Text, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '@src/context/auth';
import * as Sentry from '@sentry/react-native';
import { Image } from 'react-native-elements';
import { useContext, useState } from 'react';
import { colores } from '@src/theme';


export const SignInScreen = () => {

  const { signIn } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);

  const signInAsync = async () => {
    setIsLogin(true);
    await signIn().catch(e => setIsLogin(false));
  }

  const { height, width } = useWindowDimensions();

  return (
    <View style={{ ...styles.container }}>
      <ImageBackground
        source={require('@resources/Images/loginBackground.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ flex: 1, position: 'absolute', alignSelf: 'center', top: height * 0.18, }}>
          <Image
            source={require('@resources/Images/logo-soyUteista.png')}
            resizeMode='contain'
            style={{ width: width * 0.70, height: width * 0.70 }}
          />
        </View>
        {
          !isLogin
            ?
            <>
              <View style={{
                flex: 1,
                position: 'absolute',
                alignSelf: 'center',
                top: height * 0.54,
                flexDirection: 'column'
              }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ borderRadius: 100, borderWidth: 2, borderColor: '#0C650E' }}
                  onPress={signInAsync}
                >
                  <LinearGradient
                    colors={
                      ['#182917',
                        '#104613',
                        '#0F6513',
                        '#128A10']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 100, }}
                  >
                    <Text style={{
                      ...styles.buttonText,
                      paddingHorizontal: height * 0.03,
                      paddingVertical: height * 0.0001,
                      fontSize: height * 0.043,
                      // fontFamily: fonts.regular,
                    }}>
                      Iniciar Sesión
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={{
                  color: colores.Cool_Gray_5_C,
                  alignSelf: 'center',
                  // fontFamily: fonts.regular,
                  marginTop: width * 0.018,
                  fontSize: height * 0.02
                }}>con cuenta de correo institucional</Text>
              </View>

              <View style={{
                flex: 1,
                position: 'absolute',
                bottom: -height * 0.05,
                right: width * 0.02
              }}>
                <Image
                  source={require('@resources/Images/cip-logo.png')}
                  resizeMode='contain'
                  style={{ width: width * 0.45, height: width * 0.45 }}
                />
              </View>
            </>
            :
            <ActivityIndicator
              style={{
                flex: 1,
                position: 'absolute',
                alignSelf: 'center',
                top: height * 0.54,
                flexDirection: 'column'
              }}
              size={width * 0.1}
              color={colores.White}
            />
        }

      </ImageBackground>


    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    flex: 1,
    justifyContent: "center"
  },
  appEst: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
  signInButton: {
    // width: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
});