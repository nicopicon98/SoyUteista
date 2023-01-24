import { useCoursesByIdTutor, useDayByAsignatura, useInsertTutorias, useSearchTutoria, useTutorInfo } from './hooks';
import { Text, View, StyleSheet, ActivityIndicator, Dimensions, Appearance, Pressable, Modal } from 'react-native';
import { useFranjaByDiaAsignatura } from '../../hooks/use-franja-by-dia-asignatura';
import { getInfoTutor, GraphManager, postInsertTutoria } from '../../services';
import { blobToBase64, Capitalize, dayToID, idToDay } from '../../utilities';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomCalendarComponent } from '../../components/custom-calendar';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import React, { useContext, useEffect, useState } from 'react';
import { CreateCita, NavigationProps } from '../../models';
import RadioGroup from 'react-native-radio-buttons-group';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { AuthContext } from '../../context';
import { colores } from '../../theme';

//Global values
const colorScheme = Appearance.getColorScheme();
const { width, height } = Dimensions.get('window');
const d = new Date();

//Interfaces
export type FormData = {
  id_tutor: string;
  id_asignatura: string;
  dia: string;
  franja: string;
  tema: string;
  celular: string;
  comentarios: string;
  fecha_tutoria: string;
};

DropDownPicker.setLanguage('ES');

export const CrearCitaTutoriaScreen = ({ navigation }: NavigationProps) => {

  //Insert Cita
  const [insert, setInsert] = useState(false);

  //Tutor
  const imageLogo: string = 'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg';
  const [tutorPhoto, setTutorPhoto] = useState(imageLogo);

  //Calendar
  const [dayWeek, setDayWeek] = useState(d.getDay() === 0 ? 0 : d.getDay() - 1);
  const [markedDay, setMarkedDay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  //Final Modal
  const [modalFinalVisible, setModalFinalVisible] = useState(false);

  //States for selecting value on dropdowns
  const [clickTutorDropdown, setClickTutorDropdown] = useState(false);
  const [clickCoursesByTutorDropdown, setClickCoursesByTutorDropdown] =
    useState(false);

  // Open each dropdown
  const [openTutores, setOpenTutores] = useState(false);
  const [openCoursesTutores, setOpenCoursesTutores] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const [openFranja, setOpenFranja] = useState(false);

  //Tutores
  const [valueDropTutor, setValueDropdownTutor] = useState('');
  const [tutorItems, setTutorItems] = useState<ItemType<string>[]>([]);

  //Cursos by Tutores
  const [valueDropCoursesByTutor, setValueDropdownCoursesByTutor] = useState('');
  const [coursesByTutorItems, setCoursesByTutorItems] = useState<ItemType<string>[]>([]);

  //Dias
  const [valueDropDay, setValueDropDay] = useState('');
  const [dayItems, setDayItems] = useState<ItemType<string>[]>([]);

  //Franja
  const [valuedropFranja, setValuedropFranja] = useState('');
  const [franjaItems, setFranjaItems] = useState<ItemType<string>[]>([]);

  //Visible
  const [cursosByTutorVisible, setCursosByTutorVisible] = useState(true);
  const [calendarioVisible, setCalendarioVisible] = useState(true);

  /**Global Context */
  const { authState: { user } } = useContext(AuthContext);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id_tutor: '',
      id_asignatura: '',
      dia: '',
      franja: '',
      tema: '',
      celular: '',
      comentarios: '',
      fecha_tutoria: '',
    },
  });

  //Api hooks
  const {
    onPressRadioButton,
    radioButtons,
    tutores,
    isLoadingTutor,
    courses,
    isLoadingCourses,
    clickCourses,
    currentValue,
  } = useSearchTutoria(width * 0.06);
  const { cursosByTutor, onLoadCursoByTutor, isLoadingCursoByTutor } = useCoursesByIdTutor();
  const { dayByAsignatura, isLoadingDayByAsignatura, onLoadDiaByAsignatura } = useDayByAsignatura();
  const { franjaByDiaAsignatura, isLoadingFranjaByDiaAsignatura, onLoadFranjaByDiaAsignatura } = useFranjaByDiaAsignatura();
  const { infoTutor, onLoadInfoTutor, isLoadingInfoTutor } = useTutorInfo();
  const { insertTutoria } = useInsertTutorias();

  //Effects
  useEffect(() => {
    onResetEverything();
  }, [currentValue]);

  //On change previous value effect

  useEffect(() => {
    onResetDownTutorOn();
    /**We hide the rest */
    setCalendarioVisible(false);
    setClickCoursesByTutorDropdown(false);
  }, [control._formValues.id_tutor]);

  useEffect(() => {
    onResetDownAsignaturaOn();
  }, [control._formValues.id_asignatura]);

  //Set effects
  useEffect(() => {
    onHandleSetTutores();
  }, [isLoadingTutor]);

  useEffect(() => {
    onHandleSetCoursesByTutor();
  }, [isLoadingCursoByTutor]);

  useEffect(() => {
    onHandleSetDays();
  }, [isLoadingDayByAsignatura, dayByAsignatura]); //depende de los dos por que el modal nose actualiza por si solo

  useEffect(() => {
    onHandleSetFranja();
  }, [isLoadingFranjaByDiaAsignatura, franjaByDiaAsignatura]); //depende de los dos por que el modal nose actualiza por si solo


  //Get Tutor Photo
  const getTutorPhoto = async (id_tutor: string) => {
    const correo_tutor = tutores?.find(e => e.id_tutor === id_tutor)?.correo;
    try {
      const userImage: Blob = await GraphManager.getUserPhotoAsync(
        correo_tutor!,
      );
      const answerBase64: any = await blobToBase64(userImage);
      const photo: string[] = answerBase64.split(',');
      setTutorPhoto('data:image/png;base64,' + photo[1]);
    } catch (error) {
      console.log(error);
      setTutorPhoto(imageLogo);
    }
  };

  //Click on date
  const onPressDate = (date: string) => {
    setMarkedDay(date);
  };

  //Day of the week
  const onChangeDayOfTheWeek = (value: string) => {
    setDayWeek(Number(value));
  };

  //Clear entire Form
  const onReset = () => {
    //Reseteamos el form a nada
    reset({
      id_tutor: '',
      id_asignatura: '',
      dia: '',
      franja: '',
      tema: '',
      celular: '',
      comentarios: '',
      fecha_tutoria: '',
    });
    //Quitamos el dia marcado a ninguno
    setMarkedDay('');
  };

  //Clear part of the form
  const onResetDownTutorOn = () => {
    reset({
      ...control._formValues,
      id_asignatura: '',
      dia: '',
      franja: '',
      tema: '',
      celular: '',
      comentarios: '',
      fecha_tutoria: '',
    });
    setMarkedDay('');
  };

  const onResetDownAsignaturaOn = () => {
    reset({
      ...control._formValues,
      dia: '',
      franja: '',
      tema: '',
      celular: '',
      comentarios: '',
      fecha_tutoria: '',
    });
    setMarkedDay('');
  };

  //Api calls
  const onHandleSelectTutor = (id_tutor: string) => {
    //Once we click on one option, dispatch the next API
    onLoadCursoByTutor(id_tutor);
    //Just as a flag to identify if a click was done
    setClickTutorDropdown(true);
  };

  const onHandleSelectCoursesByTutor = (id_asignatura: string) => {
    //Once we click on one option, dispatch the next API
    onLoadDiaByAsignatura(id_asignatura);
    //Just as a flag to identify if a click was done
    setClickCoursesByTutorDropdown(true);
  };

  const onHandleSelectDia = (day: string) => {
    const dia = idToDay(Number(day));
    const id_asignatura = control._formValues.id_asignatura;
    onLoadFranjaByDiaAsignatura(id_asignatura, dia);
  };

  //Set Items
  const onHandleSetTutores = () => {
    if (!isLoadingTutor && tutores) {
      setTutorItems(
        tutores.map(e => ({
          label: `${Capitalize(e.nombre)}${e.sede === 'EDUCACION VIRTUAL' ? '\nEducacion Virtual' : ''
            }`,
          value: e.id_tutor,
          testID: e.id_tutor,
          icon: () => {
            return e.sede === 'EDUCACION VIRTUAL' ? (
              <View style={{ flexDirection: 'row' }}>
                <Icon name="people-circle-outline" size={25} />
                <Icon name="desktop-outline" size={12} />
              </View>
            ) : (
              <Icon name="person-outline" size={25} />
            );
          },
        })),
      );
    }
  };

  const onHandleSetCoursesByTutor = () => {
    if (!isLoadingCursoByTutor && cursosByTutor) {
      setCoursesByTutorItems(
        cursosByTutor.map(e => ({
          label: Capitalize(e.curso),
          value: e.id_asignatura,
          testID: e.id_asignatura,
          icon: () => <Icon name="book-outline" size={25} />,
        })),
      );
    }
  };

  const onHandleSetDays = () => {
    if (!isLoadingDayByAsignatura && dayByAsignatura) {
      setDayItems(
        dayByAsignatura.map(e => ({
          label: Capitalize(e.dia),
          value: dayToID(e.dia).toString(),
          testID: dayToID(e.dia).toString(),
          icon: () => <Icon name="today-outline" size={25} />
        }))
      );
    }
  };

  const onHandleSetFranja = () => {
    if (!isLoadingFranjaByDiaAsignatura && franjaByDiaAsignatura) {
      setFranjaItems(
        franjaByDiaAsignatura.map(e => ({
          label: e.nombre_franja,
          value: e.franja,
          testID: e.franja,
          icon: () => <Icon name="timer-outline" size={25} />,
        })),
      );
    }
  };

  //Send Form

  //part 1
  const onSubmitFirstPart = async (data: FormData) => {
    await getTutorPhoto(data.id_tutor);
    console.log(data);
    setModalFinalVisible(true);
  };

  //part 2
  const onSubmitFinal = async () => {
    console.log("click")
    const { _formValues: { id_asignatura, dia, franja, celular, comentarios, tema, fecha_tutoria } } = control;
    const diaValue = idToDay(Number(dia))
    const rep = await getInfoTutor(id_asignatura, diaValue, franja)
    const { data } = rep;
    crearCita({
      id_crear_cita: data[0].id_crearCitas,
      documento: user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD,
      nombre: user!.userFullName,
      programa: user!.userMoreInfo.C_PROG_NOMBRE,
      sexo: 'M',
      jornada: user!.userMoreInfo.C_FRAN_DESCRIPCION,
      correo: user!.userEmail,
      celular,
      comentarios,
      tema,
      franja,
      fecha_tutoria
    });
  };

  const crearCita = async (obj: CreateCita) => {
    const {
      id_crear_cita,
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
    const { data: { result, error } } = await postInsertTutoria(obj)
    console.log(result)
    console.log(error)
    setModalFinalVisible(false);
    onHandleSuccessInsercionTutoria(result, error);
  }

  const onResetEverything = () => {
    /**Reseteamos el form */
    onReset();
    /**We hide the rest */
    //Cursos by tutor
    setCursosByTutorVisible(false);
    setClickTutorDropdown(false);
    //Calendario
    setCalendarioVisible(false);
    setClickCoursesByTutorDropdown(false);
  }

  const onHandleSuccessInsercionTutoria = (result: number, error: string) => {
    if (result == 1) {
      console.log("insertada")
      navigation.navigate("Tutorías Agendadas");
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Felicitaciones',
        textBody: 'Tu cita ha sido creada con exito',
        button: 'cerrar',
        closeOnOverlayTap: true,
        onPressButton: () => {
          Dialog.hide();
        },
        onHide: () => {
          Dialog.hide();
        }
      })
      onResetEverything();
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Ups!',
        textBody: error,
        button: 'cerrar',
        closeOnOverlayTap: true,
        onPressButton: () => {
          Dialog.hide();
        },
        onHide: () => {
          Dialog.hide();
        }
      })
    }
    setInsert(false);
  }

  //findFranja by id_franja
  const franjaValue = (id_franja: string = '') => {
    if (franjaByDiaAsignatura) {
      const franja = franjaByDiaAsignatura?.find(e => e.franja === id_franja);
      return franja?.nombre_franja;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Seleccion tipo Busqueda */}
        <View style={{ ...styles.seleccionBusqueda }}>
          <Text style={{ ...styles.label }}>
            Seleccione el tipo de consulta{' '}
            <Text style={styles.mandatory}>*</Text>
          </Text>
          <View style={styles.radioGroupButton}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="row"
              containerStyle={{
                padding: 0,
                margin: 0,
              }}
            />
          </View>
        </View>
        {/* Tutores: Docente/Monitor */}
        {!isLoadingTutor && tutores ? (
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DropDownPicker
                searchable={true}
                addCustomItem={false}
                placeholder={
                  currentValue === 'docente'
                    ? 'Selecciona un docente'
                    : 'Selecciona un tutor'
                }
                listMode="MODAL"
                open={openTutores}
                value={valueDropTutor}
                items={tutorItems}
                setOpen={setOpenTutores}
                setValue={setValueDropdownTutor}
                setItems={setTutorItems}
                onSelectItem={({ value }) => {
                  //guardamos el valor actual en el form
                  onChange(value);
                  onHandleSelectTutor(value!);
                  //Mostramos los cursos por tutor
                  setCursosByTutorVisible(true);
                }}
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  marginTop: width * 0.04,
                }}
                listItemContainerStyle={{
                  width: '100%',
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  borderBottomStartRadius: 16,
                  borderBottomEndRadius: 16,
                }}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
            )}
            name="id_tutor"
          />
        ) : (
          <></>
        )}

        {/*Cursos por tutor*/}
        {!isLoadingCursoByTutor &&
          cursosByTutor.length > 0 &&
          cursosByTutorVisible ? (
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DropDownPicker
                searchable={true}
                listMode="MODAL"
                placeholder={`Seleccione un curso`}
                value={valueDropCoursesByTutor}
                open={openCoursesTutores}
                setOpen={setOpenCoursesTutores}
                items={coursesByTutorItems}
                setItems={setCoursesByTutorItems}
                setValue={setValueDropdownCoursesByTutor}
                onSelectItem={({ value }) => {
                  onChange(value);
                  onHandleSelectCoursesByTutor(value!);
                  //Mostramos los dias
                  setCalendarioVisible(true);
                }}
                style={{ alignSelf: 'center', width: '100%', marginTop: 10 }}
                listItemContainerStyle={{
                  width: '100%',
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  borderBottomStartRadius: 16,
                  borderBottomEndRadius: 16,
                  height: 'auto',
                }}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
                selectedItemLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                zIndex={1000}
                zIndexInverse={3000}
              />
            )}
            name="id_asignatura"
          />
        ) : clickTutorDropdown ? (
          <ActivityIndicator />
        ) : (
          <></>
        )}

        {!isLoadingDayByAsignatura &&
          dayByAsignatura!.length > 0 &&
          calendarioVisible ? (
          <>
            <Text style={{ marginLeft: width * 0.06, marginTop: width * 0.04 }}>
              A continuación elige día, hora y fecha de la tutoria
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={{ alignItems: 'center', marginTop: width * 0.01 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 8,
                    width: width * 0.9,
                    alignItems: 'center',
                  }}>
                  <Text style={{ marginLeft: width * 0.023 }}>
                    <Icon
                      name={'calendar-outline'}
                      size={30}
                      color={colores.Pantone_382_C}
                    />
                  </Text>
                  {control._formValues.fecha_tutoria.length > 0 &&
                    control._formValues.dia.length > 0 &&
                    control._formValues.franja.length > 0 ? (
                    <View
                      style={{ marginVertical: width * 0.01, marginLeft: 10 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                        {control._formValues.fecha_tutoria.length > 0 ? (
                          <>
                            Fecha:{' '}
                            <Text style={{ fontWeight: '500' }}>
                              {control._formValues.fecha_tutoria}
                            </Text>
                          </>
                        ) : (
                          ''
                        )}
                      </Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                        {control._formValues.dia.length > 0 ? (
                          <>
                            Día:{' '}
                            <Text style={{ fontWeight: '500' }}>
                              {Capitalize(idToDay(control._formValues.dia))}
                            </Text>
                          </>
                        ) : (
                          ''
                        )}
                      </Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                        {control._formValues.franja.length > 0 ? (
                          <>
                            Franja:{' '}
                            <Text style={{ fontWeight: '500' }}>
                              {franjaValue(control._formValues.franja)}
                            </Text>
                          </>
                        ) : (
                          ''
                        )}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  <View style={{ flex: 1 }} />
                  <Text style={{ marginRight: width * 0.02 }}>
                    <Icon
                      name={'chevron-down-outline'}
                      size={width * 0.06}
                      color={'black'}
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : clickCoursesByTutorDropdown ? (
          <ActivityIndicator />
        ) : (
          <></>
        )}

        {/* Celular, Tema, boton enviar */}
        {control._formValues.fecha_tutoria.length > 0 &&
          control._formValues.dia.length > 0 &&
          control._formValues.franja.length > 0 ? (
          <>
            <View style={{ alignContent: 'center', marginTop: width * 0.015 }}>
              <Text style={{ marginLeft: width * 0.06 }}>
                Y ahora solo ingresa tu celular y el tema la tutoria
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={
                      <Text>
                        Celular<Text style={{ color: 'red' }}>*</Text>
                      </Text>
                    }
                    outlineColor="black"
                    activeOutlineColor="black"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    right={<TextInput.Icon icon="cellphone" />}
                    style={{
                      marginHorizontal: width * 0.05,
                      borderColor: 'black',
                      backgroundColor: 'white',
                    }}
                  />
                )}
                name="celular"
              />
              {errors.celular && (
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: width * 0.033,
                    color: 'red',
                    marginLeft: width * 0.06,
                    fontStyle: 'italic',
                  }}>
                  Este campo es requerido!
                </Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={
                      <Text>
                        Tema<Text style={{ color: 'red' }}>*</Text>
                      </Text>
                    }
                    outlineColor="black"
                    activeOutlineColor="black"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable
                    multiline
                    maxLength={50}
                    value={value}
                    numberOfLines={2}
                    right={<TextInput.Icon icon="pencil" />}
                    style={{
                      marginHorizontal: width * 0.05,
                      backgroundColor: 'white',
                    }}
                  />
                )}
                name="tema"
              />
              {errors.tema && (
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: width * 0.033,
                    color: 'red',
                    marginLeft: width * 0.06,
                    fontStyle: 'italic',
                  }}>
                  Este campo es requerido!
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={handleSubmit(onSubmitFirstPart)}>
              <View style={{ alignItems: 'center', marginTop: width * 0.07 }}>
                <View style={styles.buttonContinuar}>
                  <Text style={{ ...styles.buttonContinuarText }}>Continuar</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}

        {/* Modal Dia, Hora, Fecha */}
        <Modal
          animationType="slide"
          hardwareAccelerated={true}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../resources/Images/schedule_appointment.jpg')}
                  resizeMode="contain"
                  style={styles.imageLogo}
                />
              </View>

              {/**Modal body */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDownPicker
                    placeholder={`Seleccione un dia`}
                    value={valueDropDay}
                    open={openDays}
                    setOpen={setOpenDays}
                    items={dayItems}
                    setItems={setDayItems}
                    setValue={setValueDropDay}
                    onSelectItem={({ value }) => {
                      onChange(value);
                      onHandleSelectDia(value!);
                      onChangeDayOfTheWeek(value!);
                    }}
                    style={{ alignSelf: 'center', width: '100%', marginTop: 10 }}
                    listItemContainerStyle={{
                      width: '100%',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      borderBottomStartRadius: 16,
                      borderBottomEndRadius: 16,
                      height: 'auto',
                    }}
                    containerStyle={{
                      width: '90%',
                      alignSelf: 'center',
                    }}
                    selectedItemLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                  />
                )}
                name="dia"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDownPicker
                    dropDownDirection="BOTTOM"
                    placeholder={`Seleccione una franja`}
                    value={valuedropFranja}
                    open={openFranja}
                    setOpen={setOpenFranja}
                    items={franjaItems}
                    setItems={setFranjaItems}
                    setValue={setValuedropFranja}
                    onSelectItem={({ value }) => {
                      onChange(value);
                    }}
                    style={{ alignSelf: 'center', width: '100%', marginTop: 10 }}
                    listItemContainerStyle={{
                      width: '100%',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      borderBottomStartRadius: 16,
                      borderBottomEndRadius: 16,
                      height: 'auto',
                    }}
                    containerStyle={{
                      width: '90%',
                      alignSelf: 'center',
                    }}
                    selectedItemLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    zIndex={1000}
                    zIndexInverse={3000}
                  />
                )}
                name="franja"
              />
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ textAlign: 'center' }}>
                  A continuacion, elije una fecha segun el dia seleccionado
                </Text>
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomCalendarComponent
                    markedDay={markedDay}
                    dayWeek={dayWeek}
                    onPressDate={onPressDate}
                    setModalVisible={setModalVisible}
                    onChangeDate={onChange}
                  />
                )}
                name="fecha_tutoria"
              />
              {/* Actions */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                }}>
                {/* Salir sin guardar */}
                <View style={styles.buttonGuardarContentChild}>
                  <Pressable
                    onPress={() => {
                      control._formValues.fecha_tutoria.length > 0 &&
                        control._formValues.dia.length > 0 &&
                        control._formValues.franja.length > 0
                        ? console.log('guardado')
                        : Toast.show({
                          type: ALERT_TYPE.DANGER,
                          title: 'Avertencia!',
                          textBody: 'Aun faltan datos por guardar',
                          autoClose: 2000,
                        });
                      setModalVisible(false);
                    }}
                    style={styles.buttonEliminar}>
                    <Text style={styles.buttonGuardarText}>Volver</Text>
                  </Pressable>
                </View>

                {/* Guardar */}
                <View style={styles.buttonGuardarContentChild}>
                  <Pressable
                    disabled={
                      control._formValues.fecha_tutoria.length > 0 &&
                        control._formValues.dia.length > 0 &&
                        control._formValues.franja.length > 0
                        ? false
                        : true
                    }
                    onPress={() => setModalVisible(false)}
                    style={{
                      ...styles.buttonGuardar,
                      backgroundColor:
                        control._formValues.fecha_tutoria.length > 0 &&
                          control._formValues.dia.length > 0 &&
                          control._formValues.franja.length > 0
                          ? colores.Pantone_383_C
                          : colores.Cool_Gray_5_C,
                    }}>
                    <Text style={styles.buttonGuardarText}>Guardar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal Final */}
        <Modal
          animationType="fade"
          hardwareAccelerated={true}
          transparent={true}
          visible={modalFinalVisible}
          onRequestClose={() => {
            setModalFinalVisible(!modalFinalVisible);
          }}>
          <View style={styles.centeredViewFinalModal}>
            <View style={styles.modalFinalView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Teacher's image */}
                <View
                  style={{ alignItems: 'center', marginVertical: width * 0.03 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: width * 0.05,
                      textAlign: 'center',
                    }}>
                    Ya casi terminamos!
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: tutorPhoto }}
                    resizeMode="contain"
                    style={{
                      borderRadius: 1000,
                      height: width * 0.4,
                      width: width * 0.4,
                    }}
                  />
                </View>

                {/*Teacher's name and email */}
                <View style={{ alignItems: 'center', marginTop: width * 0.02 }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: width * 0.045,
                      textAlign: 'center',
                    }}>
                    {
                      tutores?.find(
                        e => e.id_tutor === control._formValues.id_tutor,
                      )?.nombre
                    }
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontStyle: 'italic',
                      fontSize: width * 0.03,
                    }}>
                    {
                      tutores?.find(
                        e => e.id_tutor === control._formValues.id_tutor,
                      )?.correo
                    }
                  </Text>
                </View>

                {/* All the info */}
                <View
                  style={{
                    marginTop: width * 0.02,
                    borderColor: colores.Cool_Gray_5_C,
                    borderWidth: 0.8,
                    paddingHorizontal: width * 0.03,
                    paddingVertical: width * 0.02,
                  }}>
                  {/* Asignatura */}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: width * 0.03,
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Asignatura:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {Capitalize(
                          cursosByTutor?.find(
                            e =>
                              e.id_asignatura ===
                              control._formValues.id_asignatura,
                          )?.curso!,
                        )}
                      </Text>
                    </View>
                  </View>

                  {/* Tema */}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: width * 0.02,
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Tema:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {control._formValues.tema}
                      </Text>
                    </View>
                  </View>

                  {/* Dia, fecha y franja, Modalidad */}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: width * 0.025,
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Dia:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {Capitalize(idToDay(Number(control._formValues.dia)))}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Fecha:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {control._formValues.fecha_tutoria}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Franja:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {
                          franjaByDiaAsignatura?.find(
                            e => e.franja === control._formValues.franja,
                          )?.nombre_franja
                        }
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Modalidad:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {tutores?.find(
                          e => e.id_tutor === control._formValues.id_tutor,
                        )?.sede === 'EDUCACION VIRTUAL'
                          ? 'Virtual'
                          : 'Presencial'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Lugar:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {Capitalize(
                          tutores?.find(
                            e => e.id_tutor === control._formValues.id_tutor,
                          )?.sede!,
                        )}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: width * 0.02,
                    }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '700' }}>Contacto:</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: '400' }}>
                        {control._formValues.celular}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Comentarios Adicionales */}
                <View style={{ marginTop: width * 0.03 }}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        label="Comentarios Adicionales"
                        outlineColor="black"
                        activeOutlineColor="black"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable
                        multiline
                        maxLength={50}
                        value={value}
                        numberOfLines={2}
                        right={<TextInput.Icon icon="pencil" size={20} />}
                        style={{
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                    name="comentarios"
                  />
                </View>

                {/* Actions */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: width * 0.12,
                  }}>
                  {/* Salir sin guardar */}

                  <View style={styles.buttonGuardarContentChild}>
                    <Pressable
                      onPress={() => {
                        control._formValues.fecha_tutoria.length > 0 &&
                          control._formValues.dia.length > 0 &&
                          control._formValues.franja.length > 0
                          ? console.log('guardado')
                          : Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: 'Avertencia!',
                            textBody: 'Aun faltan datos por guardar',
                            autoClose: 2000,
                          });
                        setModalFinalVisible(false);
                      }}
                      style={styles.buttonEliminar}>
                      <Text style={styles.buttonGuardarText}>Volver</Text>
                    </Pressable>
                  </View>

                  <View style={styles.buttonGuardarContentChild}>
                    <Pressable
                      onPress={() => {
                        console.log("click")
                        setInsert(true);
                        onSubmitFinal()
                      }}
                      style={styles.buttonAgendar}>
                      {
                        !insert
                          ? <Text style={styles.buttonGuardarText}>Agendar</Text>
                          : <ActivityIndicator />
                      }
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* <Text>{JSON.stringify(control._formValues, null, 2)}</Text> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
  },
  seleccionBusqueda: {
    marginLeft: width * 0.05,
    maxWidth: width * 0.8,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? 'white' : 'black',
  },
  mandatory: {
    color: 'red',
  },
  radioGroupButton: {
    alignSelf: 'auto',
    maxWidth: width,
    margin: 0,
    padding: 0,
    marginLeft: -width * 0.03,
    marginTop: width * 0.01,
  },
  buttonClose: {
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredViewFinalModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalFinalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
  },
  buttonContinuar: {
    width: '25%',
    backgroundColor: colores.Pantone_383_C,
    alignItems: 'center',
    paddingVertical: width * 0.02,
    borderRadius: 100,
  },
  buttonContinuarText: {
    fontSize: width * 0.042,
    fontWeight: '500',
  },
  imageLogo: {
    width: width * 0.8,
    height: width * 0.4,
  },
  buttonGuardar: {
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.02,
    borderRadius: 100,
  },
  buttonAgendar: {
    backgroundColor: colores.Pantone_383_C,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.01,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonEliminar: {
    backgroundColor: colores.Cool_Gray_5_C,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.01,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonGuardarText: {
    fontSize: width * 0.04,
    textAlign: 'center',
    color: 'white',
  },
  buttonAgendarText: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: 'white',
  },
  buttonGuardarContentChild: {
    width: width * 0.3,
    zIndex: 2000,
  },
  input: {
    height: height * 0.04,
    marginVertical: width * 0.01,
    marginHorizontal: width * 0.05,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: 'black',
    color: 'black',
  },
});
