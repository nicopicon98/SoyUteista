import { StyleSheet } from "react-native";

export const colores = {
  //main
  Pantone_383_C: '#C3D730',
  Pantone_382_C: '#002A14',
  Cool_Gray_5_C: '#B3B3B3',
  Blue_Rey: '#0b4a75',
  Brown: '#5A4F4C',

  //Palette
  Green_Grass: '#70D730',
  Green_Light: '#30D744',
  Green_Aqua: '#30D798',
  Blue_Dark: '#3070D7',
  Blue_Heaven: '#30C3D7',
  White: '#FFFFFF',

  //opacity
  GreenLightOpacity: 'rgba(196, 215, 48, 0.5)',
  GreenGrassOpacity: 'rgba(0, 42, 20, 1)',

  //notifications
  warning: '#FFA500',
  info: '#00687A',
  danger: '#800000'
}

export const fonts = {
  regular: 'MyriadPro-Regular',
  semibold: 'helvetica',
  semibold_italic: 'helvetica'
}

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    alignItems: 'center',
    padding: 10,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profileUserName: {
    fontWeight: '700',
    fontSize: 17
  },
  profileEmail: {
    fontWeight: '700',
    fontSize: 14,
  },
  logo: {
    width: 120,
    height: 120,
  }
});