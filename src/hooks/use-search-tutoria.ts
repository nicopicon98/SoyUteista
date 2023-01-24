import { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useBringTutor } from './use-bring-tutor.hook';
import { useCourses } from './use-courses.hook';
import { useState } from 'react';

export const useSearchTutoria = (size: number) => {

  const { loadTutores, isLoadingTutor, setIsLoadingTutor, tutores } = useBringTutor();
  const { courses, isLoadingCourses, loadCursos, clickCourses, setClickCourses } = useCourses();
  const [currentValue, setCurrentValue] = useState<string>();
  const radioButtonsData: RadioButtonProps[] = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Docente',
      value: 'docente',
      onPress: async function () {
        setCurrentValue(this.value)
        setClickCourses(false);
        await loadTutores(this.value)
      },
      size,
      labelStyle: {
        fontSize: size * 0.6,
      },
    },
    {
      id: '2',
      label: 'Estudiante Monitor',
      value: 'monitor',
      onPress: async function () {
        setCurrentValue(this.value)
        setClickCourses(false);
        await loadTutores(this.value)
      },
      size,
      labelStyle: {
        fontSize: size * 0.6,
      }
    },
    {
      id: '3',
      label: 'Curso',
      value: 'curso',
      onPress: async function () {
        setCurrentValue(this.value)
        setClickCourses(true);
        await loadCursos();
      },
      size,
      labelStyle: {
        fontSize: size * 0.6,
      }
    }
  ]
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData)
  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray);
  }

  return {
    onPressRadioButton,
    radioButtons,
    tutores,
    isLoadingTutor,
    loadTutores,
    setIsLoadingTutor,
    courses,
    isLoadingCourses,
    clickCourses,
    currentValue
  }
}
