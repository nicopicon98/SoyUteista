import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'

interface CustomImageTutoresCrearCitaProps {
  uri: string;
}

const { width, height } = Dimensions.get('window');

export const CustomImageTutoresCrearCita = ({ uri }: CustomImageTutoresCrearCitaProps) => {
  return (
    <>
      <Image
        source={{ uri }}
        style={styles.iconStyle}
      />
    </>

  )
}

const styles = StyleSheet.create({
  iconStyle: {
    width: width*0.15,
    height: width*0.15,
    borderRadius: 1000,
  }
})