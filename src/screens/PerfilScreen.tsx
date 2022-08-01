import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, Appearance, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

import { colores, fonts } from '../theme/appTheme';
import { AuthContext } from '../context/AuthContext';

export const PerfilScreen = () => {

  const [loadProgress, setLoadProgress] = useState(true);
  const [progress, setProgress] = useState(0);
  const { authState: { user } } = useContext(AuthContext);
  const colorScheme = Appearance.getColorScheme();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      setLoadProgress(false);
      setProgress(user!.userMoreInfo.C_ESTP_CREDITOSAPROBADOS / user!.userMoreInfo.C_PENS_TOTALCREDITOS)
    }, 2000);
  })

  return (
    <View style={{ ...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      {/* Progress Bar */}
      {/* Divider */}
      <View style={styles.section1} />
      {/* /* Photo */}
      <View style={styles.separator}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: user!.userPhotoError ? user!.userPhoto : 'data:image/png;base64,' + user!.userPhoto }}
            resizeMode='cover'
            style={{
              ...styles.profilePhoto,
              width: width * 0.4,
              height: width * 0.4,
              borderRadius: width,
              borderWidth: width * 0.01,
            }}
          />
        </View>

        {/* /* Nombre */}
        <Text style={{ ...styles.textName, fontSize: height * 0.03, marginTop: height * 0.008 }}>{user!.userFullName}</Text>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ marginTop: 1 }}><Icon name={'mail'} size={width * 0.05} color={colores.Pantone_383_C} /></Text>
          <Text style={{ fontSize: height * 0.018, fontFamily: fonts.semibold_italic }}>  {user!.userMoreInfo.C_PENG_EMAILINSTITUCIONAL}</Text>
        </View>

        {/* Info */}
        <View style={{ ...styles.basicInfo, marginTop: height*0.046 }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1 }}>{user!.userMoreInfo.C_FRAN_DESCRIPCION}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Jornada</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1 }}>{user!.userMoreInfo.C_SITE_DESCRIPCION}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Situación</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1 }}>{user!.userMoreInfo.C_CATE_DESCRIPCION}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Categoría</Text>
          </View>
        </View>

        <View style={styles.basicInfo}>
          <View style={{ alignItems: 'center', }}>
            <View style={styles.progressBar}>
              <Text>
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}> {user!.userMoreInfo.C_AVANCE.toFixed(1)}%</Text>
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
            <Text style={{ color: colores.Cool_Gray_5_C }}>Créditos Aprobados {user!.userMoreInfo.C_ESTP_CREDITOSAPROBADOS}/{user!.userMoreInfo.C_PENS_TOTALCREDITOS}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1 }}>{user!.userMoreInfo.C_ESTP_PROMEDIOGENERAL.toFixed(2)}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Promedio Acumulado</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1, textAlign: 'center' }}>{user!.userMoreInfo.C_PROG_NOMBRE}</Text>
          <Text style={{ color: colores.Cool_Gray_5_C }}>Programa</Text>
        </View>

        <View style={{ ...styles.basicInfo, marginTop: 30 }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1 }}>{user!.userMoreInfo.C_UNID_NOMBRE}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Sede</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: height*0.02, marginBottom: 1 }}>{user!.userMoreInfo.C_PENS_DESCRIPCION.slice(6, user!.userMoreInfo.C_PENS_DESCRIPCION.length)}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Pensum</Text>
          </View>
        </View>

        {/* Franja */}
        <View style={{
          marginTop: height * 0.06,
          backgroundColor: colorScheme === 'dark' ? colores.White : colores.Cool_Gray_5_C ,
          width: '60%',
          borderWidth: height * 0.00001,
          height: height * 0.002,
          alignSelf: 'center'
        }}
        />
        

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex'
  },
  row: {
    flexDirection: 'row'
  },
  section1: {
    backgroundColor: colores.Blue_Rey,
    height: '25%',
    shadowColor: "#000",
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
    fontWeight: 'bold',
  },
  separator: {
    top: '10%',
  },
  imageContainer: {
    position: 'absolute',
    bottom: '100%',
    alignSelf: 'center',
    overflow: "hidden",
    elevation: 11
  },
  progressBar: {
    alignItems: 'center',
    marginBottom: 7
  },
  basicInfo: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  }
});

