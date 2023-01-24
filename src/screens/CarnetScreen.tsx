import React, { useEffect, useContext } from 'react'
import { ImageBackground, StyleSheet, View, useWindowDimensions, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from 'react-native-animatable';
import QRCode from 'react-native-qrcode-svg';
import { Image } from 'react-native-elements';

import { colores, fonts } from '../theme/appTheme';
import { AuthContext } from '../context/auth.component';
import AppBarComponent from '../components/app-bar/app-bar.component';

const { width, height } = Dimensions.get('window');

export const CarnetScreen = () => {

  const imageBackground: string = "../resources/Images/carnetFondo.jpg";
  const imageLogo: string = "../resources/Images/Logo.png";
  const imageEscudo: string = "../resources/Images/carnetEscudo.png";

  const { authState: { user } } = useContext(AuthContext);

  const fullName: string = `${user!.userMoreInfo.C_PENG_PRIMERNOMBRE} ${user!.userMoreInfo.C_PENG_SEGUNDONOMBRE || ""} ${user!.userMoreInfo.C_PENG_PRIMERAPELLIDO} ${user!.userMoreInfo.C_PENG_SEGUNDOAPELLIDO}`;
  const urlQR: string = `https://soyuteista.uts.edu.co/carnet/getData.php?email=${user!.userMoreInfo.C_PENG_EMAILINSTITUCIONAL}`;

  return (
    <>
    <AppBarComponent title='Carnet'/>
    <View style={styles.container}>

      <ImageBackground source={require(imageBackground)} resizeMode="cover" style={styles.image}>
        <ScrollView>
          <View style={{ padding: width*0.06, paddingTop: 0, paddingBottom: width*0.03 }}>
            {/* Cabecera */}
            <View style={styles.cabecera}>
              <Text style={styles.text}>Carnet estudiantil digital</Text>
            </View>
            {/* Logo and Escudo */}
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: width*0.03, alignItems: 'center' }}>
              <Image source={require(imageLogo)} resizeMode='contain' style={styles.imageLogo} />
              <Image source={require(imageEscudo)} resizeMode='contain' style={styles.imageEscudo} />
            </View>
            {/* Nombre */}
            <Text style={{ ...styles.fullName }}>{fullName}</Text>
            {/* Identificacion */}
            <Text style={styles.id}>C.C {user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD}</Text>
            {/* Programa Academico */}
            <Text style={styles.programa}>{user!.userMoreInfo.C_PROG_NOMBRE}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <Text style={styles.dividerText}>{user!.userMoreInfo.C_UNID_NOMBRE}</Text>
          </View>

          {/* QR - Descripcion - valido hasta */}
          <View style={{ padding: width*0.03, paddingTop: 0 }}>
            <View style={{ flexDirection: 'row', marginTop: width * 0.06 }}>
              {/* QR */}
              <View style={{ paddingLeft: width*0.04, marginTop: width*0.01 }}>
                <QRCode value={urlQR} size={width * 0.39} />
              </View>
              {/* Descripcion - valido hasta */}
              <View style={styles.desValContainer}>
                {/* Descripcion */}
                <Text style={styles.descripcion}>Este carnet acredita al portador como estudiante de las UTS, su uso es personal e intransferible. Escanee el siguiente código QR para verificar la validez de este documento.
                  {"\n"}
                  {"\n"}
                  Válido hasta: {typeof user!.userMoreInfo.C_PEUN_FECHAFIN === 'string'
                    ? user!.userMoreInfo.C_PEUN_FECHAFIN.slice(0, 10)
                    : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* UTS url */}
          <Text style={styles.UTSurl}>www.uts.edu.co</Text>
        </ScrollView>
      </ImageBackground>

    </View>
    </>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    paddingTop: 0
  },
  text: {
    color: 'white',
    fontSize: width*0.054,
    fontFamily: fonts.semibold
  },
  cabecera: {
    alignContent: 'center',
    backgroundColor: colores.Pantone_383_C,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: width*0.1,
    borderBottomRightRadius: width*0.1,
    width: width*0.75,
    alignSelf: 'center',
    padding: width*0.025,
  },
  imageLogo: {
    width: width*0.5,
    height: width*0.29,
  },
  imageEscudo: {
    width: width*0.4,
    height: width*0.4,
  },
  fullName: {
    marginTop: width*0.02,
    fontSize: width*0.1,
    color: colores.Pantone_383_C,
    fontFamily: fonts.semibold,
  },
  id: {
    fontSize: width*0.07,
    marginTop: width*0.01,
    fontFamily: fonts.semibold,
    color: colores.Brown
  },
  programa: {
    fontSize: width*0.043,
    marginTop: width*0.01,
    fontFamily: fonts.semibold,
    color: colores.Brown
  },
  divider: {
    backgroundColor: colores.Brown,
    padding: width*0.014,
    alignItems: 'center',
  },
  dividerText: {
    color: colores.Pantone_383_C,
    fontSize: width*0.05,
    fontFamily: fonts.semibold,
  },
  UTSurl: {
    fontSize: width*0.09,
    color: colores.Brown,
    fontFamily: fonts.semibold,
    alignSelf: 'center',
    marginTop: width*0.019
  },
  descripcion: {
    fontSize: width*0.0389,
    fontFamily: fonts.semibold,
    color: colores.Brown,
    textAlign: 'justify'
  },
  desValContainer: {
    marginLeft: width*0.03,
    marginRight: width*0.03,
    flexGrow: 1,
    flex: 1
  }
});