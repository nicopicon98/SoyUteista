import React from 'react'
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';

import { MateriaInterface } from '../interfaces/HorarioInterface';
import { colores } from '../theme/appTheme';

interface Props {
  materia: MateriaInterface;
}

export const MateriaHorario = ({ materia }: Props) => {

  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.component}>
      <View style={styles.card}>
        {/* Hora */}
        <View style={styles.row}>
          <Text style={{...styles.textHighlited, maxWidth: width*0.85}}>{materia.HORA_INICIO.slice(0, 2) + ":" + materia.HORA_INICIO.slice(2)} - </Text>
          <Text style={{...styles.textHighlited, maxWidth: width*0.85}}>{materia.HORA_FINAL.slice(0, 2) + ":" + materia.HORA_FINAL.slice(2)}</Text>
        </View>
        {/* Materia - Grupo */}
        <View style={styles.row}>
          <Text style={{...styles.text, maxWidth: width*0.85}}>{materia.NOMBRE_MATERIA} ({materia.CODIGO_MATERIA}) - {materia.GRUPO}</Text>
        </View>
        {/* Descripcion - Salon */}
        <Text style={{...styles.text, maxWidth: width*0.85}}>{materia.DESCRIPCION} - {materia.SALON}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    margin: 10,
    borderColor: colores.Blue_Rey,
    borderWidth: 1,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    padding: 10,
  },
  text: {
    color: colores.Cool_Gray_5_C
  },
  textHighlited: {
    color: colores.Blue_Rey
  },
  row: {
    flexDirection: 'row'
  }
});