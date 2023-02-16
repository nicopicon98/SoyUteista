import {
  createCoursesItemsAdapter,
  createFranjasItemsAdapter,
  createTutorItemsAdapter,
  createDaysItemsAdapter
} from './adapters';
import { Dimensions, StyleSheet, Text, View, Modal, Pressable, ScrollView, ImageSourcePropType, Platform } from 'react-native';
import { Capitalize, errorHandlerCelular, isOneEmpty } from '@src/utilities';
import { useFranjaByDiaAsignatura } from './hooks';
import { useFetchCourses, useDayByAsignatura, useFetchTutores, useTutorInfo } from "./hooks";
import { CustomCalendarComponent } from '@src/components/custom-calendar';
import { ActivityIndicator, TextInput } from "react-native-paper";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GraphError } from '@microsoft/microsoft-graph-client';
import { ITutorInfoResp, NavigationProps } from "@src/models";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardTutorias } from '@src/components/card-tutorias';
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from '@src/context/snackbar';
import { Image } from 'react-native-elements';
import { getTutorPhoto, postInsertTutoria } from '@src/services';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@src/context/auth';
import { ICreateCita } from './models';
import { colores } from "@src/theme";
import axios from 'axios';
import moment from 'moment';

export type TFormData = {
  id_course: string;
  day: string;
  franja: string;
  id_tutor: string;
  fecha_tutoria: string;
  comments: string;
  tema: string;
  celular: string;
};

const { width, height, } = Dimensions.get("window")

export const CrearCitaTutoriaScreen = ({ navigation }: NavigationProps) => {
  // custom icons -> Optimization tip
  const [customTutoresIcon, setCustomTutoresIcon] = useState(<Icon name="account" color={colores.Pantone_382_C} size={30} />);
  const [customCoursesIcon, setCustomCoursesIcon] = useState(<Icon name='library' color={colores.Pantone_382_C} size={25} />);

  //BTN Continuar
  const [isLoadingBtnContinuar, setIsLoadingBtnContinuar] = useState(false);
  //EVENT INSERT TUTORIA
  const [clickInsertTutoria, setClickInsertTutoria] = useState(false);
  //TUTOR IMAGE
  const [tutorPhoto, setTutorPhoto] = useState<ImageSourcePropType>(require('@src/resources/Images/male-placeholder.jpeg'));
  //TUTOR
  const [tutorInfo, setTutorInfo] = useState<ITutorInfoResp>();
  //CONDITIONAL RENDERING
  const [showDependentElements, setShowDependenElements] = useState(false);
  //MODALS
  const [fullDateModalVisible, setFullDateModalVisible] = useState(false);
  const [confModalVisible, setConfModalVisible] = useState(false);

  //CONTEXT
  const { authState: { user } } = useContext(AuthContext);

  //CUSTOM HOOKS
  const { onLoadCursos, isLoadingCourses } = useFetchCourses();
  const { onLoadDayByAsignatura, isLoadingDaysByAsignatura } = useDayByAsignatura();
  const { onLoadFranjaByDiaAsignatura } = useFranjaByDiaAsignatura();
  const { onLoadTutores } = useFetchTutores();
  const { onLoadInfoTutor } = useTutorInfo();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues: {
      id_course: '',
      day: '',
      franja: '',
      id_tutor: '',
      fecha_tutoria: '',
      comments: '',
      tema: '',
      celular: ''
    },
  });
  const {
    id_course,
    day,
    franja,
    id_tutor,
    fecha_tutoria,
    comments,
    celular,
    tema } = control._formValues

  //Calendar
  const [markedDay, setMarkedDay] = useState('');
  const formmattedMarkedDay = moment(markedDay);
  if (markedDay.length > 0) formmattedMarkedDay.locale('es')

  //COURSES DROPDOWN FEATURES 
  const [openCourses, setOpenCourses] = useState(false);
  const [dropDownCourses, setDropDownCourses] = useState('');
  const [coursesItems, setCoursesItems] = useState<ItemType<string>[]>([])

  //DAYS DROPDOWN FEATURES 
  const [openDays, setOpenDays] = useState(false);
  const [dropDownDays, setDropDownDays] = useState('');
  const [daysItems, setDaysItems] = useState<ItemType<string>[]>([])

  //FRANJAS DROPDOWN FEATURES 
  const [openFranjas, setOpenFranjas] = useState(false);
  const [dropDownFranjas, setDropDownFranjas] = useState('');
  const [franjasItems, setFranjasItems] = useState<ItemType<string>[]>([])

  //TUTORES DROPDOWN FEATURES 
  const [openTutores, setOpenTutores] = useState(false);
  const [dropDownTutores, setDropDownTutores] = useState('');
  const [tutoresItems, setTutoresItems] = useState<ItemType<string>[]>([])

  // handling errors
  const { showMessage } = useSnackbar();

  const handleErrorResp = (code: string | undefined): void => {
    if (code === 'ERR_BAD_REQUEST') return showMessage("En este momento estamos experimentando problemas con el servidor, intentalo mas tarde", 'info');
    if (code === 'ImageNotFound') return showMessage("Ocurrio una excepcion trayendo la imagen del docente", 'info');
    return showMessage("Ocurrio un error, intentalo mas tarde", 'danger')
  }

  // Adaptig professionals to dropdown Items format
  const onLoadCrearTutoriaScreen = async () => {
    try {
      const resp = await onLoadCursos();
      const newCoursesItems = createCoursesItemsAdapter({ courses: resp, customIcon: customCoursesIcon });
      setCoursesItems(newCoursesItems);
    } catch (error) {
      //
    }
  }

  const franjaValue = (franjaId: string = '') => {
    if (franjasItems) {
      const franjaStr = franjasItems?.find(e => e.value === franjaId);
      return franjaStr?.label;
    }
  }

  // Click on pickers
  /**
   * Every time we dispatch this function, data from hook function onLoadDayByAsignatura
   * will be retrieved and adapted to items, next, we update the status
   * when setDayItems is called
   */
  const onSelectCourse = async (id_course: string) => {
    const customIcon = <Icon name="calendar-today" color={colores.Pantone_382_C} size={25} />
    /** http request to fetch day */
    const resp = await onLoadDayByAsignatura(id_course); //this changes schedule
    setDaysItems(createDaysItemsAdapter({ days: resp, customIcon }))
    /** Show the rest */
    setShowDependenElements(true);
    //reset everything down there to 0
    reset({
      ...control._formValues,
      day: '',
      franja: '',
      id_tutor: '',
      fecha_tutoria: '',
    })
    //Close pickers
    setOpenDays(false);
    setOpenFranjas(false);
    setOpenTutores(false);
    //unselect values from picker and date
    setMarkedDay('');
    setDropDownDays('');
    setDropDownFranjas('');
    setDropDownTutores('');
    //remove all adapted tutors and franja
    setTutoresItems([]);
    setFranjasItems([]);
  }

  const onSelectDay = async (day: string) => {
    /** http request to fetch day */
    const resp = await onLoadFranjaByDiaAsignatura(id_course, day); //this changes schedule
    setFranjasItems(createFranjasItemsAdapter({ franjas: resp }))
  }

  const onSelectDate = async (date: string) => {
    setMarkedDay(date);
  }

  const onSelectSaveFullDateModal = async () => {
    try {
      const resp = await onLoadTutores(franja, id_course, day);
      setTutoresItems(createTutorItemsAdapter({ tutores: resp, customIcon: customTutoresIcon }));
    } catch (error) {
      console.error(error);
      //
    }
  }

  // Click on submit to open confirmation modal
  const onSubmitFirstPart = async () => {
    setIsLoadingBtnContinuar(true);
    try {
      const tutorInfoResp = await onLoadInfoTutor(id_course, day, franja, id_tutor);
      setTutorInfo(currentTutorInfo => {
        // Only update state if new value differs from current
        return JSON.stringify(currentTutorInfo) !== JSON.stringify(tutorInfoResp) ? tutorInfoResp : currentTutorInfo;
      });
      const tutorPhotoResp = await getTutorPhoto(tutorInfoResp.correo);
      setTutorPhoto(currentTutorPhoto => {
        // Only update state if new value differs from current
        return currentTutorPhoto !== tutorPhotoResp ? tutorPhotoResp : currentTutorPhoto;
      });
      setConfModalVisible(true);
    } catch (err) {
      //first catch crucial errors
      if (axios.isAxiosError(err)) {
        return handleErrorResp(err.code)
      }
      // Handle the error consistently
      if (err instanceof GraphError) {
        setTutorPhoto(require('@src/resources/Images/male-placeholder.jpeg')) //set to image not found
        setConfModalVisible(true);
        return handleErrorResp(err.code!);
      }
    } finally {
      setIsLoadingBtnContinuar(false);
    }
  }

  // Click on submit to insert tutoria
  const onSubmit = async (data: TFormData) => {
    //we first set the loader so the user knows he clicked on it
    setClickInsertTutoria(true);
    //prepare the object to be sent
    const obj: ICreateCita = {
      id_crearCitas: tutorInfo!.id_crearCitas,
      documento: user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD,
      nombre: user!.userFullName,
      programa: user!.userMoreInfo.C_PROG_NOMBRE,
      jornada: user!.userMoreInfo.C_FRAN_DESCRIPCION,
      correo: user!.userMoreInfo.C_PENG_EMAILINSTITUCIONAL,
      celular: data.celular,
      comentarios: data.comments,
      tema: data.tema,
      fecha_tutoria: data.fecha_tutoria
    }
    console.log(obj)
    const objTest: ICreateCita = {
      id_crearCitas: '8586',
      documento: '1098813165',
      nombre: 'Nicolas Picon',
      programa: 'Tecnologia en desarrollo de sistemas informaticos',
      jornada: 'DIURNA',
      correo: 'npiconj@uts.edu.co',
      celular: '3054762954',
      comentarios: 'prueba insercion 16 feb',
      tema: 'prueba insercion a las 2:00 am',
      fecha_tutoria: '2023-02-16'
    }
    try {
      const insertResp = await postInsertTutoria(objTest);
      if (insertResp) {
        setClickInsertTutoria(false);
        setConfModalVisible(false);
        showMessage('tutoria insertada con exito', 'success');
        navigation.navigate('Tutorías Agendadas');
        return;
      }
      setClickInsertTutoria(false);
      setConfModalVisible(false);
      showMessage('Hubo un error al insertar la tutoria, porfavor intente mas tarde', 'danger');
    } catch (error) {
      setClickInsertTutoria(false);
      setConfModalVisible(false);
      showMessage('Hubo un error al insertar la tutoria, porfavor intente mas tarde', 'danger');
    }
  }

  //Once the component is loaded, we proceed to adapt the professionals to dropdown Items format
  //if courses change, the http request will be dispatched with the specific field
  useEffect(() => {
    onLoadCrearTutoriaScreen();
  }, [])

  //VIEWS
  const loader = <ActivityIndicator
    style={{ marginTop: width * 0.1 }}
    color={colores.Pantone_383_C}
    size={width * 0.1}
  />

  const coursesView =
    <>
      <Text style={{
        maxWidth: width * 0.9,
        alignSelf: 'flex-start'
      }}>
        A continuación elige un tutor
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropDownPicker
            addCustomItem={false}
            placeholder={'Selecciona el profesional'}
            listMode="MODAL"
            searchable
            searchPlaceholder='Ingresa un curso...'
            open={openCourses}
            value={dropDownCourses}
            items={coursesItems}
            setOpen={setOpenCourses}
            setValue={setDropDownCourses}
            setItems={setCoursesItems}
            onSelectItem={({ value }) => {
              onChange(value);
              onSelectCourse(value!);
            }}
            style={{
              alignSelf: 'center',
              width: '100%',
              marginTop: width * 0.01,
            }}
            listItemContainerStyle={{
              width: '100%',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              borderBottomStartRadius: 16,
              borderBottomEndRadius: 16,
            }}
            containerStyle={styles.dropdownCommonContainer}
          />
        )}
        name="id_course"
      />
    </>

  const fullDateView =
    <>
      <Text style={{ marginTop: width * 0.03, maxWidth: width * 0.9, alignSelf: 'flex-start' }}>
        A continuación elige día, hora y fecha de la tutoria
      </Text>
      <TouchableOpacity onPress={() => setFullDateModalVisible(true)}>
        <View style={{
          ...styles.dropdownCommonContainer,
          alignItems: 'center',
          marginTop: width * 0.01
        }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
            }}>
            {/* left icon */}
            <Text style={{ marginLeft: width * 0.023 }}>
              <Icon
                name={'calendar-outline'}
                size={28}
                color={colores.Pantone_382_C}
              />
            </Text>
            {/* Show day, hour and date */}
            {!isOneEmpty(fecha_tutoria, day, franja)
              ? <View
                style={{
                  marginVertical: width * 0.0,
                  marginLeft: 10,
                }}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: colores.Pantone_382_C
                }}>
                  {fecha_tutoria.length > 0
                    ? <>
                      Fecha:{' '}
                      <Text style={{ fontWeight: '400', color: 'black' }}>
                        {fecha_tutoria}
                      </Text>
                    </>
                    : <></>}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: colores.Pantone_382_C }}>
                  {day.length > 0
                    ? <>
                      Día:{' '}
                      <Text style={{ fontWeight: '400', color: 'black' }}>
                        {Capitalize(day)}
                      </Text>
                    </>
                    : <></>}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: colores.Pantone_382_C }}>
                  {franja.length > 0
                    ? <>
                      Franja:{' '}
                      <Text style={{ fontWeight: '400', color: 'black' }}>
                        {franjaValue(franja)}
                      </Text>
                    </>
                    : <></>}
                </Text>
              </View>
              : <></>
            }
            <View style={{ flex: 1 }} />
            {/* right icon */}
            <Text style={{ marginRight: width * 0.02 }}>
              <Icon
                name={'chevron-down'}
                size={width * 0.08}
                color={'black'}
              />
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    </>

  const dayView = <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <DropDownPicker
        placeholder={`Seleccione un dia`}
        value={dropDownDays}
        open={openDays}
        setOpen={setOpenDays}
        items={daysItems}
        setItems={setDaysItems}
        setValue={setDropDownDays}
        onSelectItem={({ value }) => {
          onChange(value);
          onSelectDay(value!);
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
        tickIconStyle={{ borderColor: colores.Pantone_382_C }}
        selectedItemLabelStyle={{ color: colores.Pantone_382_C, fontWeight: 'bold' }}
      />
    )}
    name="day"
  />

  const franjaView = <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <DropDownPicker
        dropDownDirection="BOTTOM"
        placeholder={`Seleccione una franja`}
        value={dropDownFranjas}
        open={openFranjas}
        setOpen={setOpenFranjas}
        items={franjasItems}
        setItems={setFranjasItems}
        setValue={setDropDownFranjas}
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
        selectedItemLabelStyle={{ color: colores.Pantone_382_C, fontWeight: 'bold' }}
        zIndex={1000}
      />
    )}
    name="franja"
  />

  const dateView = <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <CustomCalendarComponent
        markedDay={markedDay}
        dayWeek={day}
        onPressDate={onSelectDate}
        onChangeDate={onChange}
      />
    )}
    name="fecha_tutoria"
  />

  const tutoresView =
    <>
      <Text style={{
        marginTop: width * 0.03,
        maxWidth: width * 0.9,
        alignSelf: 'flex-start'
      }}>
        A continuación elige un tutor
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropDownPicker
            addCustomItem={false}
            placeholder={'Selecciona el tutor'}
            listMode="MODAL"
            searchable
            searchPlaceholder='Ingresa un tutor...'
            open={openTutores}
            value={dropDownTutores}
            items={tutoresItems}
            setOpen={setOpenTutores}
            setValue={setDropDownTutores}
            setItems={setTutoresItems}
            onSelectItem={({ value }) => {
              onChange(value);
            }}
            style={{
              alignSelf: 'center',
              width: '100%',
              marginTop: width * 0.01,
            }}
            listItemContainerStyle={{
              width: '100%',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              borderBottomStartRadius: 16,
              borderBottomEndRadius: 16,
            }}
            containerStyle={styles.dropdownCommonContainer}
          />
        )}
        name="id_tutor"
      />
    </>

  const temaView =
    <>
      <Text style={{
        marginTop: width * 0.03,
        maxWidth: width * 0.9,
        alignSelf: 'flex-start'
      }}>
        ¿En cuál tema tiene dudas?
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode='outlined'
            placeholder='Ej: Ecuaciones diferenciales'
            outlineColor={colores.Pantone_382_C}
            activeOutlineColor={colores.Pantone_382_C}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            editable
            maxLength={50}
            value={value}
            right={
              <TextInput.Icon
                icon="head-question"
                color={(isTextInputFocused: boolean) => {
                  return isTextInputFocused ? colores.Pantone_383_C : colores.Pantone_382_C
                }}
                size={30} />
            }
            style={[styles.dropdownCommonContainer,
            {
              backgroundColor: 'rgba(196, 215, 48, 0.1)',
              fontSize: height * 0.019
            }
            ]}
          />
        )}
        name="tema"
      />
    </>

  const commentsView =
    <>
      <Text style={{
        marginTop: width * 0.03,
        maxWidth: width * 0.9,
        alignSelf: 'flex-start'
      }}>
        A continuación describe algun comentario adicional
      </Text>
      <Controller
        control={control}
        rules={{
          // required: true,
        }}
        render={({ field: { onChange, onBlur, value, } }) => (
          <TextInput
            mode='outlined'
            placeholder='Ej: Repaso de ecuaciones'
            outlineColor={colores.Pantone_382_C}
            activeOutlineColor={colores.Pantone_382_C}
            onChangeText={onChange}
            onBlur={onBlur}
            editable
            multiline
            maxLength={50}
            value={value}
            right={
              <TextInput.Icon
                icon="chat-question"
                color={(isTextInputFocused: boolean) => {
                  return isTextInputFocused ? colores.Pantone_383_C : colores.Pantone_382_C
                }}
                size={30} />
            }
            style={[
              styles.dropdownCommonContainer,
              {
                backgroundColor: 'rgba(196, 215, 48, 0.1)',
                fontSize: height * 0.019
              }]}
          />
        )}
        name="comments"
      />
    </>

  const submitBtnContinueView = <View style={{
    marginTop: width * 0.03,
    marginBottom: width * 0.05,
  }}><TouchableOpacity
    activeOpacity={0.75}
    onPress={onSubmitFirstPart}
  >
      <View style={{ alignItems: 'center', marginTop: width * 0.02 }}>
        <View style={styles.buttonContinuar}>
          {
            isLoadingBtnContinuar
              ? <ActivityIndicator color='white' />
              : <Text style={{ ...styles.buttonContinuarText }}>Continuar</Text>
          }
        </View>
      </View>
    </TouchableOpacity>
  </View>

  // MODAL VIEWS
  const fullDateModal = <Modal
    animationType="slide"
    hardwareAccelerated={true}
    transparent={true}
    visible={fullDateModalVisible}
    onRequestClose={() => {
      setFullDateModalVisible(false);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('@resources/Images/schedule_appointment.jpg')}
            resizeMode="contain"
            style={styles.imageLogo}
          />
        </View>
        {/**Modal body */}
        {dayView}
        {franjaView}
        <ScrollView
          indicatorStyle='white'
        >
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ textAlign: 'center' }}>
              A continuacion, elije una fecha segun el dia seleccionado
            </Text>
          </View>
          {dateView}
          {/* Actions */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 10,
            }}>
            {/* Salir sin guardar */}
            <View style={styles.buttonGuardarContentChild}>
              <Pressable
                onPress={() => {
                  //we first hide modal
                  setFullDateModalVisible(false);
                  //reset everything down there to 0
                  reset({
                    ...control._formValues,
                    day: '',
                    franja: '',
                    id_tutor: '',
                    fecha_tutoria: '',
                  })
                  //Close pickers
                  setOpenDays(false);
                  setOpenFranjas(false);
                  setOpenTutores(false);
                  //unselect values from picker and date
                  setMarkedDay('');
                  setDropDownDays('');
                  setDropDownFranjas('');
                  setDropDownTutores('');
                  //if exit without saving, dissapear teachers
                  setTutoresItems([])
                }}
                style={styles.buttonEliminar}>
                <Text style={styles.buttonGuardarText}>Volver</Text>
              </Pressable>
            </View>

            {/* Guardar */}
            <View style={styles.buttonGuardarContentChild}>
              <Pressable
                disabled={
                  !isOneEmpty(fecha_tutoria, day, franja)
                    ? false
                    : true
                }
                onPress={() => {
                  //click on save and everything is up and running
                  setFullDateModalVisible(false);
                  onSelectSaveFullDateModal();
                }}
                style={{
                  ...styles.buttonGuardar,
                  backgroundColor:
                    !isOneEmpty(fecha_tutoria, day, franja)
                      ? colores.Pantone_383_C
                      : colores.Cool_Gray_5_C,
                }}>
                <Text style={styles.buttonGuardarText}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>

  const confModal = <Modal
    animationType="fade"
    hardwareAccelerated={true}
    transparent={true}
    visible={confModalVisible}
    onRequestClose={() => {
      setConfModalVisible(false);
    }}>
    <View style={styles.centeredViewFinalModal}>
      <View style={styles.modalFinalView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Entire content */}
          <View style={{}}>
            <View style={{
              alignItems: 'center',
              marginVertical: width * 0.03
            }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: width * 0.04,
                  textAlign: 'justify',
                  width: '100%'
                }}>
                Por favor confirma que los datos a continuación sean correctos:
              </Text>
            </View>
            {/* Teacher's image */}
            <View style={{ alignItems: 'center' }}>
              <Image
                source={tutorPhoto}
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
              {/* Name */}
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: width * 0.045,
                  textAlign: 'center',
                }}>
                {tutoresItems.find(e => e.value === id_tutor)?.label}
              </Text>
              {/* Email */}
              <Text
                style={{
                  fontWeight: '400',
                  fontStyle: 'italic',
                  fontSize: width * 0.03,
                }}>
                {tutorInfo?.correo}
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
                      coursesItems?.find(
                        e =>
                          e.value === id_course,
                      )?.label
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
                    {tema}
                  </Text>
                </View>
              </View>
              {/* Dia */}
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
                    {Capitalize(day)}
                  </Text>
                </View>
              </View>
              {/* Fecha */}
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
                    {fecha_tutoria}
                  </Text>
                </View>
              </View>
              {/* Franja */}
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
                      franjasItems?.find(
                        e => e.value === franja,
                      )?.label
                    }
                  </Text>
                </View>
              </View>
              {/* Modalidad */}
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
                    Virtual/Presencial
                  </Text>
                </View>
              </View>
              {/* Sede */}
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
                    {tutorInfo?.sede}
                  </Text>
                </View>
              </View>
              {/* Ubicacion */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: width * 0.02,
                }}>
                <View style={{ width: '50%', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: '700' }}>Ubicacion tutoria:</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontWeight: '400' }}>
                    {`${tutorInfo?.ubicacion} ${tutorInfo?.nombre_lugar}`}
                  </Text>
                </View>
              </View>
            </View>

            {/* Contacto */}
            <View style={{
              marginTop: width * 0.03,
              alignItems: 'center',
            }}>
              <Text style={{ maxWidth: width * 0.9, alignSelf: 'flex-start' }}>
                A continuación ingresa un numero de contacto
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 10,
                  pattern: /3[0-9]{9}/gm, //colombian cel                
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode='outlined'
                    placeholder='Ej: 3054762954'
                    outlineColor={colores.Pantone_382_C}
                    activeOutlineColor={colores.Pantone_382_C}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    maxLength={10}
                    keyboardType='number-pad'
                    value={value}
                    right={
                      <TextInput.Icon
                        icon="cellphone"
                        color={(isTextInputFocused: boolean) => {
                          return isTextInputFocused ? colores.Pantone_383_C : colores.Pantone_382_C
                        }}
                        size={30} />
                    }
                    style={{
                      backgroundColor: 'rgba(196, 215, 48, 0.1)',
                      fontSize: height * 0.019,
                      width: '100%'
                    }}
                  />
                )}
                name="celular"
              />
              {errors.celular
                ? <View style={{ width: '100%', marginLeft: width * 0.01 }}>
                  <Text style={{ color: colores.danger, fontWeight: '500' }}>{errorHandlerCelular(errors.celular?.type)}</Text>
                </View>
                : <></>}
            </View>

            {/* Actions */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: width * 0.05,
                marginBottom: width * 0.2
              }}>

              {/* Salir sin guardar */}
              <View style={styles.buttonGuardarContentChild}>
                <Pressable
                  onPress={() => setConfModalVisible(false)}
                  style={styles.buttonEliminar}>
                  <Text style={styles.buttonGuardarText}>Volver</Text>
                </Pressable>
              </View>
              {/**Insertar cita */}
              <View style={styles.buttonGuardarContentChild}>
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  style={styles.buttonAgendar}>
                  {
                    !clickInsertTutoria
                      ? <Text style={styles.buttonGuardarText}>Agendar</Text>
                      : <ActivityIndicator color={colores.White} />
                  }
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>


  //VALIDATE SUBMIT
  const validateButtonSubmit = !isOneEmpty(id_course, day, franja, fecha_tutoria, id_tutor);
  return (
    <>
      <CardTutorias>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.container}>
            {
              (isLoadingCourses)
                ? loader
                : coursesView
            }
            {
              (showDependentElements)
                ? (isLoadingDaysByAsignatura)
                  ? loader
                  : <>
                    {fullDateView}
                    {tutoresView}
                    {temaView}
                    {commentsView}
                  </>
                : <></>
            }
            {validateButtonSubmit
              ? submitBtnContinueView
              : <></>}
            {fullDateModal}
            {confModal}
          </SafeAreaView>
        </ScrollView>
      </CardTutorias>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContinuar: {
    width: '100%',
    backgroundColor: colores.Pantone_383_C,
    alignItems: 'center',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.02,
    borderRadius: 100,
  },
  buttonContinuarText: {
    fontSize: width * 0.05,
    fontWeight: '500',
    color: colores.White
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
  buttonGuardar: {
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.02,
    borderRadius: 100,
  },
  buttonGuardarText: {
    fontSize: width * 0.04,
    textAlign: 'center',
    color: 'white',
  },
  buttonGuardarContentChild: {
    width: width * 0.3,
    zIndex: 2000,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginBottom: 0,
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
    width: width * 0.95,
    height: height * 0.95,
    top: Platform.OS === 'ios' ? 50 : 0
  },
  modalFinalView: {
    marginBottom: 0,
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
    top: Platform.OS === 'ios' ? 0 : 0,
    width: width * 0.95,
    height: height * 0.9
  },
  imageLogo: {
    width: width * 0.8,
    height: width * 0.4,
  },
  dropdownCommonContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  centeredViewFinalModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})