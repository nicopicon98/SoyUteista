import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Appearance,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

import {colores, fonts} from '../theme/appTheme';
import {AuthContext} from '../context/auth.component';
import AppBarComponent from '../components/app-bar/app-bar.component';

export const PerfilScreen = () => {
  const [loadProgress, setLoadProgress] = useState(true);
  const [progress, setProgress] = useState(0);
  const {
    authState: {user},
  } = useContext(AuthContext);
  const colorScheme = Appearance.getColorScheme();
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      setLoadProgress(false);
      setProgress(
        user!.userMoreInfo.C_ESTP_CREDITOSAPROBADOS /
          user!.userMoreInfo.C_PENS_TOTALCREDITOS,
      );
    }, 2000);
  });

  return (
    <>
      <AppBarComponent title="Perfil" />
      <View
        style={{
          ...styles.container,
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        }}>
        {/* Progress Bar */}
        {/* Divider */}
        <View style={styles.section1} />
        {/* Photo */}
        <View style={styles.separator}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: user!.userPhotoError
                  ? user!.userPhoto
                  : 'data:image/png;base64,' + user!.userPhoto,
              }}
              resizeMode="cover"
              style={{
                ...styles.profilePhoto,
                width: width * 0.4,
                height: width * 0.4,
                borderRadius: width,
                borderWidth: width * 0.01,
              }}
            />
          </View>

          {/* Nombre y Correo*/}
          <Text
            style={{
              ...styles.textName,
              fontSize: height * 0.033,
              marginTop: height * 0.008,
              fontFamily: fonts.semibold,
            }}>
            {user!.userFullName}
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{marginTop: 1}}>
              <Icon
                name={'mail'}
                size={width * 0.05}
                color={colores.Pantone_383_C}
              />
            </Text>
            <Text
              style={{
                fontSize: height * 0.018,
                fontFamily: fonts.semibold_italic,
              }}>
              {' '}
              {user!.userMoreInfo.C_PENG_EMAILINSTITUCIONAL}
            </Text>
          </View>

          {/* Info */}
          <View style={{...styles.basicInfo, marginTop: height * 0.046}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: height * 0.0229,
                  marginBottom: 1,
                  fontFamily: fonts.semibold,
                }}>
                {user!.userMoreInfo.C_FRAN_DESCRIPCION}
              </Text>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Jornada
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: height * 0.0229,
                  marginBottom: 1,
                  fontFamily: fonts.semibold,
                }}>
                {user!.userMoreInfo.C_SITE_DESCRIPCION}
              </Text>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Situación
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: height * 0.0229,
                  marginBottom: 1,
                  fontFamily: fonts.semibold,
                }}>
                {user!.userMoreInfo.C_CATE_DESCRIPCION}
              </Text>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Categoría
              </Text>
            </View>
          </View>

          <View style={styles.basicInfo}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.progressBar}>
                <Text>
                  <Text
                    style={{
                      alignItems: 'center',
                      fontSize: height * 0.0218,
                      fontFamily: fonts.semibold,
                    }}>
                    {' '}
                    {user!.userMoreInfo.C_AVANCE.toFixed(1)}%
                  </Text>
                </Text>
                <Progress.Bar
                  progress={progress}
                  width={175}
                  height={11}
                  color={colores.Pantone_383_C}
                  indeterminate={loadProgress}
                  animationType={'timing'}
                />
              </View>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Créditos Aprobados {user!.userMoreInfo.C_ESTP_CREDITOSAPROBADOS}
                /{user!.userMoreInfo.C_PENS_TOTALCREDITOS}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: height * 0.0229,
                  marginBottom: 1,
                  fontFamily: fonts.semibold,
                }}>
                {user!.userMoreInfo.C_ESTP_PROMEDIOGENERAL.toFixed(2)}
              </Text>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Promedio Acumulado
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: height * 0.0229,
                marginBottom: 1,
                textAlign: 'center',
              }}>
              {user!.userMoreInfo.C_PROG_NOMBRE}
            </Text>
            <Text
              style={{
                fontSize: height * 0.018,
                color: colores.Cool_Gray_5_C,
                fontFamily: fonts.semibold_italic,
              }}>
              Programa
            </Text>
          </View>

          <View style={{...styles.basicInfo, marginTop: 30}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: height * 0.0229,
                  marginBottom: 1,
                }}>
                {user!.userMoreInfo.C_UNID_NOMBRE}
              </Text>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Sede
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: height * 0.0229,
                  marginBottom: 1,
                }}>
                {user!.userMoreInfo.C_PENS_DESCRIPCION.slice(
                  6,
                  user!.userMoreInfo.C_PENS_DESCRIPCION.length,
                )}
              </Text>
              <Text
                style={{
                  fontSize: height * 0.018,
                  color: colores.Cool_Gray_5_C,
                  fontFamily: fonts.semibold_italic,
                }}>
                Pensum
              </Text>
            </View>
          </View>

          {/* Franja */}
          <View
            style={{
              marginTop: height * 0.06,
              backgroundColor:
                colorScheme === 'dark' ? colores.White : colores.Cool_Gray_5_C,
              width: '60%',
              borderWidth: height * 0.00001,
              height: height * 0.002,
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
  },
  section1: {
    backgroundColor: colores.Blue_Rey,
    height: '25%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  profilePhoto: {
    borderColor: '#f2f2f2',
  },
  textName: {
    alignSelf: 'center',
  },
  separator: {
    top: '10%',
  },
  imageContainer: {
    position: 'absolute',
    bottom: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: 11,
  },
  progressBar: {
    alignItems: 'center',
    marginBottom: 7,
  },
  basicInfo: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});
