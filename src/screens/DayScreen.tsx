import React from 'react'
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-animatable';
import { MateriaHorario } from '../components/MateriaHorario';
import { MateriaInterface } from '../interfaces/horarioInterface';
import { colores } from '../theme/appTheme';


interface Props {
  materias: MateriaInterface[];
}

export const DayScreen = ({ materias }: Props) => {

  return (
    <View>
      <ScrollView>
        {materias.map((materia, index) => <MateriaHorario key={materia.CODIGO_MATERIA + index} materia={materia}/>)}
      </ScrollView>
    </View>
  )
}