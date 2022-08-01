import React, { useEffect, useContext } from 'react'
import { ImageBackground, StyleSheet, View, useWindowDimensions, Dimensions, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-animatable';
import QRCode from 'react-native-qrcode-svg';
import { Image } from 'react-native-elements';

import { colores } from '../theme/appTheme';
import { AuthContext } from '../context/AuthContext';

export const CarnetScreen = () => {

  const imageBackground: string = "../resources/Images/carnetFondo.jpg";
  const imageLogo: string = "../resources/Images/Logo.png";
  const imageEscudo: string = "../resources/Images/carnetEscudo.png";

  const { width, height } = Dimensions.get('window');

  const { authState: { user } } = useContext(AuthContext);

  const fullName: string = `${user!.userMoreInfo.C_PENG_PRIMERNOMBRE} ${user!.userMoreInfo.C_PENG_SEGUNDONOMBRE || ""} ${user!.userMoreInfo.C_PENG_PRIMERAPELLIDO} ${user!.userMoreInfo.C_PENG_SEGUNDOAPELLIDO}`;
  const urlQR: string = `https://soyuteista.uts.edu.co/carnet/getData.php?email=${user!.userMoreInfo.C_PENG_EMAILINSTITUCIONAL}`;

  return (
    <View style={styles.container}>
      <ImageBackground source={require(imageBackground)} resizeMode="cover" style={styles.image}>
        <View style={{ ...styles.padding, paddingTop: 0 }}>
          {/* Cabecera */}
          <View style={styles.cabecera}>
            <Text style={styles.text}>Carnet estudiantil digital</Text>
          </View>
          {/* Logo and Escudo */}
          <View style={{ ...styles.row, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
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
        <View style={{ ...styles.padding }}>
          <View style={{ ...styles.row, marginTop: width * 0.06 }}>
            {/* QR */}
            <View style={{ paddingLeft: 15, marginTop: 5 }}>
              <QRCode value={urlQR} size={width * 0.38} />
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
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    padding: 10
  },
  image: {
    flex: 1,
    paddingTop: 0
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  },
  cabecera: {
    alignContent: 'center',
    backgroundColor: colores.Pantone_383_C,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: '80%',
    alignSelf: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  imageLogo: {
    width: 201,
    height: 120,
  },
  imageEscudo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  fullName: {
    marginTop: 10,
    fontSize: 37,
    color: colores.Pantone_383_C,
    paddingLeft: 12,
    fontWeight: 'bold'
  },
  id: {
    fontSize: 24,
    paddingLeft: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: colores.Brown
  },
  programa: {
    fontSize: 16,
    paddingLeft: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: colores.Brown
  },
  divider: {
    backgroundColor: colores.Brown,
    alignItems: 'center',
    padding: 4
  },
  dividerText: {
    color: colores.Pantone_383_C,
    fontSize: 18
  },
  UTSurl: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colores.Brown,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 15
  },
  descripcion: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: colores.Brown,
    flexShrink: 1,
    justifyContent: 'space-evenly',
    textAlign: 'justify'
  },
  desValContainer: {
    marginLeft: 12,
    marginRight: 15,
    flexGrow: 1,
    flex: 1
  }
});