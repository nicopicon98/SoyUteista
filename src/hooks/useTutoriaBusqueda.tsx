import React, { useState } from 'react'

import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useBringTutor } from './useBringTutor';

export const useTutoriaBusqueda = () => {

  const { loadTutores, isLoadingTutor, setIsLoadingTutor, tutores } = useBringTutor();

  const bringCursos = () => {
    console.log("Trayendo cursos");
  }

  const radioButtonsData: RadioButtonProps[] = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Docente',
      value: 'docente',
      onPress: function () {
        loadTutores(this.value)
      }
    },
    {
      id: '2',
      label: 'Estudiante Monitor',
      value: 'monitor',
      onPress: function () {
        loadTutores(this.value)
      }
    },
    {
      id: '3',
      label: 'Curso',
      value: 'curso',
      onPress: bringCursos
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
    setIsLoadingTutor
  }
}
