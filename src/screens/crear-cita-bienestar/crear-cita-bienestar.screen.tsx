import { createProfessionalItemsAdapter, createScheduleItemAdapter } from "./adapters";
import { fromDMYSlashtoYMDHyphen, fromYMDHyphentoDMYSlash } from "@src/utilities";
import { SegmentedButtonsResponsive } from "./components/segmented-buttons";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { CustomCalendarComponent } from "./components/custom-calendar";
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { CardBienestar } from "@src/components/card-bienestar"
import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from '@src/context';
import { useGetProByField } from "./hooks";
import { colores } from "@src/theme";
import { servicesFn } from "./data";
import { useGetAvailSchedule } from './hooks/use-get-avail-schedule.hook';
import moment from "moment";
import 'moment/locale/es';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    console.log(_field)
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
    console.log(value)
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
            {schedule: franjasFromSelectedDate!}))
  };

  //Click on Franja
  const onSelectFranja = (franja: string) => {
    console.log(franja)
  }

  // Click on continue,
  const onSubmitFirstPart = (data: FormData) => {
    /**Check if empty values */
    //TODO
    /**Open modal confirmation */
    //TODO
  };

  // Click on insert Appointment
  const onSubmit = async () => {
    /**Check number is inserted properly, use Regex */
    //TODO
    /**Get all info */
    //const { id_horario, student_celphone: userStudentCelphone } = data;
    //const userStudentEmail = user!.userEmail;
    //const obj = insertCitaBienestarAdapter({ id_horario, userStudentCelphone, userStudentEmail })
    //console.log("sending", obj)
    //TODO -> control._formValues
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

  const submitButtonFirstPart = <TouchableOpacity onPress={handleSubmit(onSubmitFirstPart)}>
    <View style={{ alignItems: 'center', marginTop: width * 0.02 }}>
      <View style={styles.buttonContinuar}>
        <Text style={{ ...styles.buttonContinuarText }}>Continuar</Text>
      </View>
    </View>
  </TouchableOpacity>

  console.log("fields", control._formValues)
  const validateButtonSubmit = 
        control._formValues.id_usuario.length > 0 &&
        control._formValues.id_horario.length > 0 &&
        control._formValues.date.length > 0
        
  return (
    <CardBienestar>
      <SafeAreaView style={styles.container}>
        <SegmentedButtonsResponsive
          buttons={servicesButtonsFormatted}
          value={field}
          onValueChange={setField}
        />
        {
          (isLoadingProfessionals)
            ? <ActivityIndicator />
            : professionalsView
        }
        {
          (showDependentElements)
            ? (isLoadingSchedules)
              ? <ActivityIndicator />
              : <>
                {calendar}
                {franjas}
              </>
            : <></>
        }
        {validateButtonSubmit 
          ? <View style={{marginTop: width*0.08}}>{submitButtonFirstPart}</View>
          : <></>}
        
      </SafeAreaView>
    </CardBienestar>
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
  },
});