import { colores } from '@src/theme';
import React from 'react'
import { StyleSheet, View, Text, useWindowDimensions, Dimensions, Appearance } from 'react-native';
import { MateriaInterface } from '../../models';

interface Props {
  materia: MateriaInterface;
}

const {width} = Dimensions.get('window');
const colorScheme = Appearance.getColorScheme();

export const MateriaHorario = ({ materia }: Props) => {

  const { width } = useWindowDimensions();

  return (
    <View style={styles.component}>
      <View style={styles.card}>
        {/* Hora */}
        <View style={styles.row}>
          <Text style={{ ...styles.textHighlited, maxWidth: width * 0.85 }}>{materia.HORA_INICIO.slice(0, 2) + ":" + materia.HORA_INICIO.slice(2)} - </Text>
          <Text style={{ ...styles.textHighlited, maxWidth: width * 0.85 }}>{materia.HORA_FINAL.slice(0, 2) + ":" + materia.HORA_FINAL.slice(2)}</Text>
        </View>
        {/* Materia - Grupo */}
        <View style={styles.row}>
          <Text style={{ ...styles.text, maxWidth: width * 0.85 }}>{materia.NOMBRE_MATERIA} ({materia.CODIGO_MATERIA}) - {materia.GRUPO}</Text>
        </View>
        {/* Descripcion - Salon */}
        <Text style={{ ...styles.text, maxWidth: width * 0.85 }}>{materia.DESCRIPCION} - {materia.SALON}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    margin: 10,
    borderColor: colorScheme === 'dark' ? colores.Cool_Gray_5_C : colores.Pantone_382_C,
    borderWidth: 1,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    padding: 10,
  },
  text: {
    color: colores.Cool_Gray_5_C,
    // fontFamily: fonts.regular,
    fontSize: width*0.04
  },
  textHighlited: {
    // fontFamily: fonts.regular,
    color: colorScheme === 'dark' ? 'white' : colores.Pantone_382_C,
    fontSize: width*0.04
  },
  row: {
    flexDirection: 'row'
  }
});