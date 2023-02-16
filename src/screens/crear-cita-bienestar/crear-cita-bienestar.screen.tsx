import { createProfessionalItemsAdapter, createScheduleItemAdapter } from "./adapters";
import { errorHandlerCelular, fromDMYSlashtoYMDHyphen, fromYMDHyphentoDMYSlash } from "@src/utilities";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SegmentedButtonsResponsive } from "./components/segmented-buttons";
import { useGetAvailSchedule } from './hooks/use-get-avail-schedule.hook';
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { CustomCalendarComponent } from "./components/custom-calendar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { ActivityIndicator, TextInput } from "react-native-paper";
import { CardBienestar } from "@src/components/card-bienestar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Modal, Pressable } from 'react-native';
import { AuthContext } from '@src/context/auth';
import { useGetProByField } from "./hooks";
import { colores } from "@src/theme";
import { servicesFn } from "./data";
import moment from "moment";
import 'moment/locale/es';

const { width } = Dimensions.get('window')

export type FormData = {
  id_usuario: string;
  student_celphone: string;
  id_horario: string;
  date: string;
};

export const CrearCitaBienestarScreen = () => {
  const [field, setField] = useState<string>('odontologia');

  const { authState: { user } } = useContext(AuthContext);

  //Final Modal
  const [modalFinalVisible, setModalFinalVisible] = useState(false);

  //professionals
  const [openProfessionals, setOpenProfessionals] = useState(false);
  const [dropDownProfessionals, setDropDownProfessionals] = useState('');
  const [professionalItems, setProfessionalItems] = useState<ItemType<string>[]>([])

  //Calendar
  const [markedDay, setMarkedDay] = useState('');
  const formmattedMarkedDay = moment(markedDay);
  if (markedDay.length > 0) formmattedMarkedDay.locale('es')

  //Franjas
  const [openFranjas, setOpenFranjas] = useState(false);
  const [dropDownFranjas, setDropDownFranjas] = useState('');
  const [franjasItems, setFranjasItems] = useState<ItemType<string>[]>([])

  //Conditional rendering
  const [showDependentElements, setShowDependenElements] = useState(false);

  //Insert Cita
  const [insert, setInsert] = useState(false);

  /**Hooks */

  //fetch professionals by Field
  const {
    fetchProfessionalsByField,
    professionals,
    isLoadingProfessionals
  } = useGetProByField();

  //fetch schedule by professionaliD
  const {
    fetchSchedulesByIdProfessional,
    isLoadingSchedules,
    schedules
  } = useGetAvailSchedule()

  //Form react-hook-form
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id_usuario: '',
      student_celphone: '',
      id_horario: '',
      date: ''
    },
  });

  //Validate Submit
  const validateButtonSubmit =
    control._formValues.id_usuario.length > 0 &&
    control._formValues.id_horario.length > 0 &&
    control._formValues.date.length > 0

  //Once the component is loaded, we proceed to adapt the professionals to dropdown Items format
  //if professionals change, the http request will be dispatched with the specific field
  useEffect(() => {
    setProfessionalsItems();
  }, [professionals])


  //If the field property changed, we reset everything.
  useEffect(() => {
    changeFieldHandler();
  }, [field])


  /** Events */

  // Click on each field
  const pressFieldHandler = async function () {
    const _field = this.value;
    await fetchProfessionalsByField(_field);
  }

  //reset form, dropdown value, hide marked day, hide rest of the elements
  const changeFieldHandler = () => {
    //hide the rest of the elements
    setShowDependenElements(false);
    //we reset the form
    reset();
    //uncheck marked day
    setMarkedDay('')
    //remove selection from professionals dropdown
    setDropDownProfessionals("");
    //remove selection from franjas dropdown
    setDropDownFranjas("");
  }

  // Adaptig professionals to dropdown Items format
  const setProfessionalsItems = () => {
    const customIcon = <Icon name='account' size={25} />
    const newProfessionalsItems =
      createProfessionalItemsAdapter({ professionals, customIcon });
    setProfessionalItems(newProfessionalsItems);
  }

  // Click on professional
  const onSelectProfessional = async (value: string) => {
    /** http request to fetch available schedules */
    //TODO
    await fetchSchedulesByIdProfessional(); //this changes schedule
    /** Show the rest */
    setShowDependenElements(true);
  }

  // Click on date
  const onSelectDate = (date: string) => {
    /**We first reset franjas */
    reset({
      ...control._formValues,
      id_horario: '',
      date
    })
    setDropDownFranjas('')
    /**Set marked day and highlight it  */
    setMarkedDay(date);
    /**Filter and show frames */
    //1. we format date to the original response 
    const dateFormmated = fromYMDHyphentoDMYSlash(date);
    //2. Now we'll filter franjas from the selected date
    const franjasFromSelectedDate = schedules.find(e => e.date === dateFormmated); // siempre existe
    //3. setFranjas on Dropdown
    //3.1 we extend properties according to SOLID
    //TODO
    //obtain franja name
    setFranjasItems(
      createScheduleItemAdapter(
        { schedule: franjasFromSelectedDate! }))
  };

  //Click on Franja
  const onSelectFranja = (franja: string) => {
  }

  // Click on continue,
  const onSubmitFirstPart = () => {
    /**Open modal confirmation */
    setModalFinalVisible(true);
  };

  // Click on insert Appointment
  const onSubmitFinal = async (data: FormData) => {
    console.log("click en enviar")
  };

  // Add pressFieldHandler function to catch each field's value and send the http request
  const servicesButtonsFormatted = servicesFn(pressFieldHandler);

  // Condional JSX
  const professionalsView =
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <DropDownPicker
          addCustomItem={false}
          placeholder={'Selecciona el profesional'}
          listMode="FLATLIST"
          open={openProfessionals}
          value={dropDownProfessionals}
          items={professionalItems}
          setOpen={setOpenProfessionals}
          setValue={setDropDownProfessionals}
          setItems={setProfessionalItems}
          onSelectItem={({ value }) => {
            onChange(value);
            onSelectProfessional(value!);
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
      name="id_usuario"
    />

  //formatting to available schedules
  const availableDates = schedules.map(e => {
    return { date: fromDMYSlashtoYMDHyphen(e.date) }
  })

  const calendar = <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <CustomCalendarComponent
        markedDay={markedDay}
        onPressDate={onSelectDate}
        onChangeDate={onChange}
        availableDates={availableDates}
      />
    )}
    name="date"
  />

  const franjas = <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <DropDownPicker
        addCustomItem={false}
        placeholder={'Selecciona una franja'}
        listMode="MODAL"
        modalProps={{
          animationType: "slide"
        }}
        modalTitle={`A continuacion elije una franja para el dia ${moment(markedDay).format('LL')}:`}
        modalTitleStyle={{
          fontSize: width * 0.040
        }}
        open={openFranjas}
        value={dropDownFranjas}
        items={franjasItems}
        setOpen={setOpenFranjas}
        setValue={setDropDownFranjas}
        setItems={setFranjasItems}
        onSelectItem={({ value }) => {
          onChange(value);
          onSelectFranja(value!);
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
    name="id_horario"
  />

  const submitButtonFirstPart = <View style={{ marginTop: width * 0.08 }}><TouchableOpacity
    activeOpacity={0.75}
    onPress={onSubmitFirstPart}
  >
    <View style={{ alignItems: 'center', marginTop: width * 0.02 }}>
      <View style={styles.buttonContinuar}>
        <Text style={{ ...styles.buttonContinuarText }}>Continuar</Text>
      </View>
    </View>
  </TouchableOpacity>
  </View>


  const confModal = <Modal
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

          {/* All the info */}
          <View
            style={{
              marginTop: width * 0.02,
              borderColor: colores.Cool_Gray_5_C,
              borderWidth: 0.8,
              paddingHorizontal: width * 0.03,
              paddingVertical: width * 0.02,
            }}>
            {/* Modalidad */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: width * 0.03,
              }}>
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '700' }}>Servicio a agendar:</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontWeight: '400' }}>
                  {field}
                </Text>
              </View>
            </View>

            {/* Profesional */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: width * 0.015
              }}>
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '700' }}>Profesional:</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontWeight: '400' }}>
                  {professionals
                    .find(
                      e => e.id_usuario == control._formValues.id_usuario)?.nombre}
                </Text>
              </View>
            </View>

            {/* Ubicacion */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: width * 0.015
              }}>
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '700' }}>Ubicacion:</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontWeight: '400' }}>
                  {/* {professionals
                  .find(
                    e => e.id_usuario == control._formValues.id_usuario)?.ubicacion} */}
                  Edificio B piso 1
                </Text>
              </View>
            </View>

            {/* Fecha */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: width * 0.015
              }}>
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '700' }}>Fecha:</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontWeight: '400' }}>
                  {moment(control._formValues.date).format('LL')}
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
                  {schedules.find(e => {
                    return e.franjas.find(f => f.id_horario == control._formValues.id_horario)
                  })?.franjas[0].nombre}
                </Text>
              </View>
            </View>

          </View>

          {/* Numero de contacto */}
          <View style={{ marginTop: width * 0.03 }}>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 10,
                pattern: /3[0-9]{9}/gm, //colombian cel                
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  keyboardType="number-pad"
                  label="Numero de contacto"
                  outlineColor="black"
                  activeOutlineColor="black"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  maxLength={10}
                  value={value}
                  numberOfLines={2}
                  right={<TextInput.Icon icon="pencil" size={20} />}
                  style={{
                    backgroundColor: 'white',
                    fontSize: 14,
                  }}
                />
              )}
              name="student_celphone"
            />
            {errors.student_celphone
              ? <Text style={{color: colores.danger, fontWeight: '500'}}>{errorHandlerCelular(errors.student_celphone?.type)}</Text>
              : <></>}
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
                  setModalFinalVisible(false);
                }}
                style={styles.buttonEliminar}>
                <Text style={styles.buttonGuardarText}>Volver</Text>
              </Pressable>
            </View>

            <View style={styles.buttonGuardarContentChild}>
              <Pressable
                onPress={handleSubmit(onSubmitFinal)}
                style={styles.buttonAgendar}>
                {
                  !insert
                    ? <Text style={styles.buttonGuardarText}>Agendar</Text>
                    : <ActivityIndicator color={colores.White} />
                }
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>

  const segmentedButtons = <SegmentedButtonsResponsive
    buttons={servicesButtonsFormatted}
    value={field}
    onValueChange={setField}
  />

  const loader = <ActivityIndicator color={colores.Pantone_383_C} />

  return (
    <>
      <CardBienestar>
        <SafeAreaView style={styles.container}>
          {segmentedButtons}
          {
            (isLoadingProfessionals)
              ? loader
              : professionalsView
          }
          {
            (showDependentElements)
              ? (isLoadingSchedules)
                ? loader
                : <>
                  {calendar}
                  {franjas}
                </>
              : <></>
          }
          {validateButtonSubmit
            ? submitButtonFirstPart
            : <></>}

        </SafeAreaView>
      </CardBienestar>
      {confModal}
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
    fontSize: width * 0.042,
    fontWeight: '500',
    color: colores.White
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
  buttonGuardarContentChild: {
    width: width * 0.3,
    zIndex: 2000,
  },
  buttonAgendar: {
    backgroundColor: colores.Pantone_383_C,
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
  buttonEliminar: {
    backgroundColor: colores.Cool_Gray_5_C,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.01,
    borderRadius: 100,
    alignItems: 'center',
  },
  redWarning: {
    color: 'red'
  }
});