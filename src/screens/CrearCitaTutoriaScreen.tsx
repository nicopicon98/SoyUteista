import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';

import { useTutoriaBusqueda } from '../hooks/useTutoriaBusqueda';
import { useForm } from '../hooks/useForm';
import { useCursoByTutor } from '../hooks/useCursoByTutor';
import { useDiaByAsignatura } from '../hooks/useDiaByAsignatura';
import { useFranjaByDiaAsignatura } from '../hooks/useFranjaByDiaAsignatura';
import { useInfoTutor } from '../hooks/useInfoTutor';
import { FormCrearCitaInterface } from '../interfaces/FormCrearCitaInterface';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colores } from '../theme/appTheme';


export const CrearCitaTutoriaScreen = () => {

  const { width, height } = useWindowDimensions();

  //Formulario generico
  const {
    id_tutor,
    id_asignatura,
    dia,
    franja,
    form,
    onChange,
    setFormValue,
  } = useForm({
    id_tutor: '',
    id_asignatura: '',
    dia: '',
    franja: '',
  });

  //Custom Hooks
  const { onPressRadioButton, radioButtons, tutores, isLoadingTutor } = useTutoriaBusqueda();
  const { cursosByTutor, onLoadCursoByTutor, isLoadingCursoByTutor } = useCursoByTutor();
  const { diaByAsignatura, onLoadDiaByAsignatura, isLoadingDiaByAsignatura } = useDiaByAsignatura();
  const { franjaByDiaAsignatura, onLoadFranjaByDiaAsignatura, isLoadingFranjaByDiaAsignatura, } = useFranjaByDiaAsignatura();
  const { infoTutor, onLoadInfoTutor, isLoadingInfoTutor, } = useInfoTutor();

  //States
  const [defaultDisableTutor, setDefaultDisableTutor] = useState(true);
  const [defaultDisableAsignatura, setDefaultDisableAsignatura] = useState(true);
  const [defaultDisableDia, setDefaultDisableDia] = useState(true);
  const [defaultDisableFranja, setDefaultDisableFranja] = useState(true);

  useEffect(() => {
    setFormValue({
      ...form,
      id_tutor: '',
      id_asignatura: '',
      dia: '',
      franja: ''
    })
    setDefaultDisableTutor(true)
    setDefaultDisableAsignatura(true)
    setDefaultDisableDia(true)
    setDefaultDisableFranja(true)
  }, [tutores]);

  useEffect(() => {
    onLoadCursoByTutor(form.id_tutor)
  }, [form.id_tutor])

  useEffect(() => {
    if (form.id_asignatura.length == 0) return;
    onLoadDiaByAsignatura(form.id_asignatura)
  }, [form.id_asignatura])

  useEffect(() => {
    if (form.dia.length == 0) return;
    onLoadFranjaByDiaAsignatura(form.id_asignatura, form.dia)
  }, [form.dia])

  useEffect(() => {
    if (form.franja.length == 0) return;
    onLoadInfoTutor(form.id_asignatura, form.dia, form.franja)
  }, [form.franja])


  return (
    <View style={styles.container}>
      {/* Seleccion tipo Busqueda */}
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout='row'
        />
      </View>
      {/* Seleccion Tutor */}
      {isLoadingTutor === false && (
        <Picker
          onFocus={() => { setDefaultDisableTutor(false) }}
          selectedValue={id_tutor}
          onValueChange={async (itemValue) => {
            onChange(itemValue, 'id_tutor')
          }}
        >
          <Picker.Item
            key={'unselectable'}
            label={"no seleccionar"}
            value={0}
            enabled={defaultDisableTutor}
          />
          {tutores!.map(e => (
            <Picker.Item
              label={e.nombre}
              value={e.id_tutor}
              key={e.id_tutor}
            />
          ))}
        </Picker>
      )}
      {/* Seleccion Materia por tutor */}
      {
        (form.id_tutor.length > 0 && !isLoadingCursoByTutor) && (
          <Picker
            onFocus={() => { setDefaultDisableAsignatura(false) }}
            selectedValue={id_asignatura}
            onValueChange={(itemValue) => onChange(itemValue, 'id_asignatura')}
          >
            <Picker.Item
              key={'unselectable'}
              label={"no seleccionar"}
              value={0}
              enabled={defaultDisableAsignatura}
            />
            {cursosByTutor!.map(e => (
              <Picker.Item
                label={e.curso}
                value={e.id_asignatura}
                key={e.id_asignatura}
              />
            ))}
          </Picker>)
      }

      {/* Seleccion Dia por materia */}
      {
        (form.id_asignatura.length > 0 && !isLoadingDiaByAsignatura) && (
          <Picker
            onFocus={() => { setDefaultDisableDia(false) }}
            selectedValue={dia}
            onValueChange={(itemValue) => onChange(itemValue, 'dia')}
          >
            <Picker.Item
              key={'unselectable'}
              label={"no seleccionar"}
              value={0}
              enabled={defaultDisableDia}
            />
            {diaByAsignatura!.map(e => (
              <Picker.Item
                label={e.dia}
                value={e.dia}
                key={e.dia}
              />
            ))}
          </Picker>)
      }

      {/* Seleccion Franja por dia y materia */}
      {
        (form.dia.length > 0 && !isLoadingFranjaByDiaAsignatura) && (
          <Picker
            onFocus={() => { setDefaultDisableFranja(false) }}
            selectedValue={franja}
            onValueChange={(itemValue) => onChange(itemValue, 'franja')}
          >
            <Picker.Item
              key={'unselectable'}
              label={"no seleccionar"}
              value={0}
              enabled={defaultDisableFranja}
            />
            {franjaByDiaAsignatura!.map(e => (
              <Picker.Item
                label={e.nombre_franja}
                value={e.franja}
                key={e.franja}
              />
            ))}
          </Picker>)
      }
      {/* Informacion de confirmacion del tutor */}
      {
        !validator(form) && !isLoadingInfoTutor && (
          <View style={{ paddingHorizontal: width * 0.04, maxWidth: width }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Lugar de la tutoria: </Text>
              <Text style={{ fontSize: 18 }}>{infoTutor!.lugar}</Text>
              {/* <Text style={{ fontSize: 17 }}>C.A.E MODULO 3 EDIFICIO CERCA AL OTRO x</Text> */}
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Sede de la tutoria: </Text>
              <Text style={{ fontSize: 18 }}>{infoTutor!.sede}</Text>
              {/* <Text style={{ fontSize: 17 }}>BUCARAMANGA</Text> */}
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Correo del tutor: </Text>
              <Text style={{ fontSize: 18 }}>{infoTutor!.correo}</Text>
              {/* <Text style={{ fontSize: 17, textTransform: 'lowercase' }}>FREDYANGARITAPINO@GMAIL.COM</Text> */}
            </View>
          </View>
        )
      }

      {
        !validator(form) && !isLoadingInfoTutor && (
          <View style={{alignItems : 'center', marginTop: 40}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log("Click en el boton de enviar")}
              style={{ ...styles.createTutoriaButton, width: width * 0.3 }}
            >
              <Text style={{...styles.createTutoriaButtonText, fontSize: height*0.021}}>Solicitar Cita</Text>
            </TouchableOpacity>
          </View>
        )
      }


      {/* Para mostrar los valores actuales del form */}
      {/* <Text>{JSON.stringify(form, null, 5)}</Text> */}
    </View>
  )
}

const validator = (form: FormCrearCitaInterface): boolean => {
  let answer = false;
  Object.keys(form).map((e) => {
    if (form[e].length === 0 || form[e].lenth === null) {
      return answer = true;
    }
  })
  return answer;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  createTutoriaButton: {
    backgroundColor: colores.Pantone_382_C,
    alignItems: 'center',
    borderRadius: 100,
    padding: 10
  },
  createTutoriaButtonText: {
    color: 'white'
  },


})
