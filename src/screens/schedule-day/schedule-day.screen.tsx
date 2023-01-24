import { MateriaHorario } from './components/materia-horario';
import { View, ScrollView } from 'react-native';
import { MateriaInterface } from './models';

interface Props {
  materias: MateriaInterface[];
}

export const ScheduleDay = ({ materias }: Props) => {

  const materiaHorario = materias.map((materia, index) => <MateriaHorario key={materia.CODIGO_MATERIA + index} materia={materia} />)

  return (
    <View>
      <ScrollView>{materiaHorario}</ScrollView>
    </View>
  )
}