import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

import { colores } from '../theme/appTheme';
import { AuthContext } from '../context/AuthContext';

export const PerfilScreen = () => {

  const [loadProgress, setLoadProgress] = useState(true);
  const [progress, setProgress] = useState(0);
  const { authState: { user } } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoadProgress(false);
      setProgress(user!.userMoreInfo.C_ESTP_CREDITOSAPROBADOS / user!.userMoreInfo.C_PENS_TOTALCREDITOS)
    }, 2000);
  })

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      {/* Divider */}
      <View style={styles.section1} />
      {/* /* Photo */}
      <View style={styles.separator}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: user!.userPhotoError ? user!.userPhoto : 'data:image/png;base64,' + user!.userPhoto }}
            resizeMode='cover'
            style={{ ...styles.profilePhoto }}
          />
        </View>

        {/* /* Nombre */}
        <Text style={{ ...styles.textName, fontSize: 26 }}>{user!.userFullName}</Text>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ marginTop: 1 }}><Icon name={'mail'} size={20} color={colores.Pantone_382_C} /></Text>
          <Text style={{ fontSize: 13 }}>  {user!.userMoreInfo.C_PENG_EMAILINSTITUCIONAL}</Text>
        </View>

        {/* Info */}
        <View style={{ ...styles.basicInfo, marginTop: 40 }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1 }}>{user!.userMoreInfo.C_FRAN_DESCRIPCION}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Jornada</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1 }}>{user!.userMoreInfo.C_SITE_DESCRIPCION}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Situacion</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1 }}>{user!.userMoreInfo.C_CATE_DESCRIPCION}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Categoria</Text>
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
                color={colores.Pantone_382_C}
                indeterminate={loadProgress}
                animationType={'timing'}
              />
            </View>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Creditos Aprobados {user!.userMoreInfo.C_ESTP_CREDITOSAPROBADOS}/{user!.userMoreInfo.C_PENS_TOTALCREDITOS}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1 }}>{user!.userMoreInfo.C_ESTP_PROMEDIOGENERAL.toFixed(2)}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Promedio Acumulado</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1, textAlign: 'center' }}>{user!.userMoreInfo.C_PROG_NOMBRE}</Text>
          <Text style={{ color: colores.Cool_Gray_5_C }}>Programa</Text>
        </View>

        <View style={{ ...styles.basicInfo, marginTop: 30 }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1 }}>{user!.userMoreInfo.C_UNID_NOMBRE}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Sede</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 1 }}>{user!.userMoreInfo.C_PENS_DESCRIPCION.slice(6, user!.userMoreInfo.C_PENS_DESCRIPCION.length)}</Text>
            <Text style={{ color: colores.Cool_Gray_5_C }}>Pensum</Text>
          </View>
        </View>

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
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#f2f2f2',
  },
  textName: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 7
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

