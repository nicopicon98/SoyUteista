import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, useWindowDimensions, TextInput, Alert, ActivityIndicator, Dimensions, Appearance } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';

import { useTutoriaBusqueda } from '../hooks/useTutoriaBusqueda';
import { useForm } from '../hooks/useForm';
import { useCursoByTutor } from '../hooks/useCursoByTutor';
import { useDiaByAsignatura } from '../hooks/useDiaByAsignatura';
import { useFranjaByDiaAsignatura } from '../hooks/useFranjaByDiaAsignatura';
import { useInfoTutor } from '../hooks/useInfoTutor';
import { useTutoriasAll } from '../hooks/useTutoriasAll';
import { FormCrearCitaInterface } from '../models/FormCrearCitaInterface';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colores, fonts } from '../theme/appTheme';
import { CreateCitaInterface, RespCreateCitaInterface } from '../models/CreateCitaInterface';
import tutoriasApi from '../api/tutorias.api';
import { AuthContext } from '../context/AuthContext';
import { NavigationProps } from '../types/navigation';

const colorScheme = Appearance.getColorScheme();

export const CrearCitaTutoriaScreen = ({ navigation }: NavigationProps) => {

  const { width, height } = useWindowDimensions();


  //Formulario generico
  const {
    id_tutor,
    id_asignatura,
    dia,
    franja,
    tema,
    celular,
    comentarios,
    form,
    onChange,
    setFormValue,
  } = useForm({
    id_tutor: '',
    id_asignatura: '',
    dia: '',
    franja: '',
    tema: '',
    celular: '',
    comentarios: ''
  });
  //Global Context
  const { authState: { user } } = useContext(AuthContext);

  //Custom Hooks
  const {
    onPressRadioButton,
    radioButtons,
    tutores,
    isLoadingTutor,
    courses,
    isLoadingCourses,
    clickCourses
  } = useTutoriaBusqueda();
  
  const { cursosByTutor, onLoadCursoByTutor, isLoadingCursoByTutor } = useCursoByTutor();
  const { diaByAsignatura, onLoadDiaByAsignatura, isLoadingDiaByAsignatura } = useDiaByAsignatura();
  const { franjaByDiaAsignatura, onLoadFranjaByDiaAsignatura, isLoadingFranjaByDiaAsignatura, } = useFranjaByDiaAsignatura();
  const { infoTutor, onLoadInfoTutor, isLoadingInfoTutor, } = useInfoTutor();
  const { loadTutorias } = useTutoriasAll();

  //States
  const [defaultDisableTutor, setDefaultDisableTutor] = useState(true);
  const [defaultDisableAsignatura, setDefaultDisableAsignatura] = useState(true);
  const [defaultDisableDia, setDefaultDisableDia] = useState(true);
  const [defaultDisableFranja, setDefaultDisableFranja] = useState(true);
  const [insertTutoriaLoader, setInsertTutoriaLoader] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);


  useEffect(() => {
    emptyForm();
    setDefaultDisableTutor(true)
    setDefaultDisableAsignatura(true)
    setDefaultDisableDia(true)
    setDefaultDisableFranja(true)
    setIsCanceled(true);
  }, [tutores, courses]);

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

  //crear Cita
  const crearCita = async (obj: CreateCitaInterface) => {
    //Desestructuramos para enviar a validar lo relevante para cursos y tutores
    const {
      documento,
      nombre,
      programa,
      sexo,
      jornada,
      correo,
      celular,
      tema,
      franja
    } = obj;

    if ((validator({ documento, nombre, programa, sexo, jornada, correo, celular, tema, franja }))) {
      alertMessage("Asegurate de rellenar todos los campos")
      return;
    }
    console.log(obj);
    try {
      setInsertTutoriaLoader(true);
      const rep = await tutoriasApi.post<RespCreateCitaInterface>('/crear_cita.php', obj);
      //Validamos errores
      if (rep.data.result !== 1) {
        alertMessage(rep.data.error)
        setInsertTutoriaLoader(false);
        setIsCanceled(true);
        emptyForm();
        setDefaultDisableTutor(true)
        setDefaultDisableAsignatura(true)
        setDefaultDisableDia(true)
        setDefaultDisableFranja(true)
        return;
      }
      //if everything ok
      setInsertTutoriaLoader(false);
      await loadTutorias();
      alertMessage("Tutoría registrada con éxito. En tu correo institucional recibirás un mensaje con los detalles de la tutoría.", "Registro exitoso")
      setIsCanceled(true);
      emptyForm();
      navigation.navigate("Tutorías Agendadas");
      console.log(rep.status);
      console.log(rep.data);
    } catch (error) {
      setInsertTutoriaLoader(false);
    }

  }

  //validar inputs
  const validator = (form: FormCrearCitaInterface): boolean => {
    let answer = false;
    Object.keys(form).map((e) => {
      if (form[e].length === 0 || form[e].lenth === null) {
        return answer = true;
      }
    })
    return answer;
  }

  //Alerts
  const alertMessage = (alertMessage: string, title: string = "Atención") => {
    Alert.alert(
      title,
      alertMessage,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  //Empty form
  const emptyForm = () => {
    setFormValue({
      ...form,
      id_tutor: '',
      id_asignatura: '',
      dia: '',
      franja: '',
      tema: '',
      celular: '',
      comentarios: '',
    })
  }

  return (
    <>
      {
        isLoadingTutor && isLoadingCourses
          ?
          <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} color={colores.Pantone_382_C} size='large' />
          :
          (!insertTutoriaLoader)
            ?
            <ScrollView>
              <View style={styles.container}>
                {/* Seleccion tipo Busqueda */}
                <Text style={{
                  ...styles.label,
                  marginLeft: width * 0.05,
                  color: colorScheme === 'dark' ? 'white' : 'black'
                }}>
                  Seleccione el tipo de consulta <Text style={styles.mandatory}>*</Text></Text>
                <View style={{ flexDirection: 'row', alignSelf: 'auto', marginLeft: width * 0.02 }}>
                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                    layout='row'
                  />
                </View>
                {/*Seleccion cursos*/}
                {clickCourses && !isLoadingCourses &&
                  <Picker
                    onFocus={() => { setDefaultDisableTutor(false) }}
                    selectedValue={id_asignatura}
                    onValueChange={async (itemValue) => {
                      onChange(itemValue, 'id_asignatura')
                    }}
                    style={{ width: width * 0.97, alignSelf: 'center', overflow: 'scroll' }}
                  >
                    <Picker.Item
                      key={'unselectable'}
                      label={"Seleccione un curso"}
                      value={0}
                      enabled={defaultDisableTutor}
                    />
                    {courses!.map(e => (
                      <Picker.Item
                        label={`${e.curso} - ${e.nombre}`}
                        value={e.id_curso}
                        key={e.id_curso}
                        style={{ fontSize: width * 0.03 }}
                      />
                    ))}
                  </Picker>
                }
                {/* Seleccion Tutor */}
                {!isLoadingTutor && !clickCourses && (
                  <Picker
                    onFocus={() => { setDefaultDisableTutor(false) }}
                    selectedValue={id_tutor}
                    onValueChange={async (itemValue) => {
                      onChange(itemValue, 'id_tutor')
                    }}
                    style={{ width: width * 0.97, alignSelf: 'center' }}
                  >
                    <Picker.Item
                      key={'unselectable'}
                      label={"Seleccione un tutor"}
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
                      onValueChange={(itemValue) => {
                        onChange(itemValue, 'id_asignatura')

                      }}
                      style={{ width: width * 0.97, alignSelf: 'center' }}
                    >
                      <Picker.Item
                        key={'unselectable'}
                        label={"Seleccione un curso"}
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
                      style={{ width: width * 0.97, alignSelf: 'center' }}
                    >
                      <Picker.Item
                        key={'unselectable'}
                        label={"Seleccione un día"}
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
                      onValueChange={(itemValue) => {
                        onChange(itemValue, 'franja')
                        setIsCanceled(false);
                      }}
                      style={{ width: width * 0.97, alignSelf: 'center' }}
                    >
                      <Picker.Item
                        key={'unselectable'}
                        label={"Seleccione una franja"}
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

                {/* Input Celular */}
                {
                  !isLoadingInfoTutor && !isCanceled && (
                    <>
                      <Text style={{
                        ...styles.label,
                        marginLeft: width * 0.06,
                        color: colorScheme === 'dark' ? 'white' : 'black'
                      }}>
                        Número de celular <Text style={styles.mandatory}>*</Text></Text>
                      <TextInput
                        placeholder='+57 3012456578'
                        style={{
                          ...styles.textInput,
                          marginHorizontal: width * 0.05,
                          borderColor: colorScheme === 'dark' ? colores.Cool_Gray_5_C : ''
                        }}
                        value={celular}
                        onChangeText={(value) => onChange(value, 'celular')}
                        keyboardType="numeric"
                      />
                    </>
                  )
                }

                {/* Input Tema */}
                {!isLoadingInfoTutor && !isCanceled && (
                  <>
                    <Text style={{
                      ...styles.label,
                      marginLeft: width * 0.06,
                      color: colorScheme === 'dark' ? 'white' : 'black'
                    }}>
                      Escriba el tema del que desea la tutoría <Text style={styles.mandatory}>*</Text>
                    </Text>
                    <TextInput
                      placeholder='Ecuaciones diferenciales'
                      style={{
                        ...styles.textInput,
                        marginHorizontal: width * 0.05,
                        borderColor: colorScheme === 'dark' ? colores.Cool_Gray_5_C : ''
                      }}
                      value={tema}
                      onChangeText={(value) => onChange(value, 'tema')}
                      numberOfLines={4}
                    />
                  </>
                )
                }

                {/* Input Comentarios adicionales */}
                {!isLoadingInfoTutor && !isCanceled && (
                  <>
                    <Text style={{
                      ...styles.label,
                      marginLeft: width * 0.06,
                      color: colorScheme === 'dark' ? 'white' : 'black'
                    }}>Comentarios adicionales</Text>
                    <TextInput
                      placeholder=''
                      style={{
                        ...styles.textInput,
                        marginHorizontal: width * 0.05,
                        borderColor: colorScheme === 'dark' ? colores.Cool_Gray_5_C : ''
                      }}
                      value={comentarios}
                      onChangeText={(value) => onChange(value, 'comentarios')}
                    />
                  </>
                )
                }

                {/* Informacion de confirmacion del tutor */}
                {!isLoadingInfoTutor && !isCanceled && (
                  <View style={{ paddingHorizontal: width * 0.06, maxWidth: width }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Lugar de la tutoria: </Text>
                      <Text style={{ fontSize: 18 }}>{infoTutor!.lugar}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Sede de la tutoria: </Text>
                      <Text style={{ fontSize: 18 }}>{infoTutor!.sede}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Correo del tutor: </Text>
                      <Text style={{ fontSize: 18 }}>{infoTutor!.correo}</Text>
                    </View>
                  </View>
                )
                }

                {/* Button crear nueva tutoria */}
                {!isLoadingInfoTutor && !isCanceled && (
                  <View style={{ alignItems: 'center', marginTop: height * 0.01, marginBottom: height * 0.01 }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        return crearCita({
                          id_tipo_tutor: infoTutor!.id_crearCitas,
                          documento: user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD,
                          nombre: user!.userFullName,
                          programa: user!.userMoreInfo.C_PROG_NOMBRE,
                          sexo: 'M',
                          jornada: user!.userMoreInfo.C_FRAN_DESCRIPCION,
                          correo: user!.userEmail,
                          celular: celular,
                          comentarios: comentarios,
                          tema: tema,
                          franja: franja,
                        });
                      }}
                      style={{ ...styles.createTutoriaButton, width: width * 0.3 }}
                    >
                      <Text style={{ ...styles.createTutoriaButtonText, fontSize: height * 0.021 }}>Solicitar</Text>
                    </TouchableOpacity>
                  </View>
                )
                }


                {/* Para mostrar los valores actuales del form */}
                {/* <Text>{JSON.stringify(form, null, 5)}</Text> */}
              </View>
            </ScrollView>
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator
                size={40}
                color={colores.Pantone_383_C}
              />
              <Text>Insertando tutoria...</Text>
            </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colorScheme === 'dark' ? 'black' : 'white'
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
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 10,
  },
  label: {
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold'
  },
  mandatory: {
    color: 'red'
  }
})
