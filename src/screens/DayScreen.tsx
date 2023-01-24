import React from 'react'
import { View, ScrollView } from 'react-native';

import { MateriaHorario } from '../components/MateriaHorario';
import { MateriaInterface } from '../models/horario.model';


interface Props {
  materias: MateriaInterface[];
}

export const DayScreen = ({ materias }: Props) => {

  return (
    <View>
      <ScrollView>
        {materias.map((materia, index) => <MateriaHorario key={materia.CODIGO_MATERIA + index} materia={materia} />)}
      </ScrollView>
    </View>
  )
}