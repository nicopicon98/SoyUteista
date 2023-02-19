import { MateriaHorario } from './components/materia-horario';
import { View, ScrollView } from 'react-native';
import { IMateriaHorario } from './models';

interface IProps {
  materias: IMateriaHorario[];
}

export const ScheduleDay = ({ materias }: IProps) => {

  const materiaHorario = materias.map((materia, index) => <MateriaHorario key={materia.CODIGO_MATERIA + index} materia={materia} />)

  return (
    <View>
      <ScrollView>{materiaHorario}</ScrollView>
    </View>
  )
}