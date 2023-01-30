import { createProfessionalItemsAdapter, insertCitaBienestarAdapter } from "./adapters";
import { SegmentedButtonsResponsive } from "./components/segmented-buttons";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { CustomCalendarComponent } from "./components/custom-calendar";
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { CardBienestar } from "@src/components/card-bienestar"
import { useState, useEffect, useContext, useReducer } from 'react';
import { ActivityIndicator } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from '@src/context';
import { useGetProByField } from "./hooks";
import { colores } from "@src/theme";
import { servicesFn } from "./data";

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
      id_horario: ''
    },
  });

  //Once the component is loaded, we proceed to adapt the professionals to dropdown Items format
  //if professionals change, the http request will be dispatched with the specific field
  useEffect(() => {
    setProfessionalsItems();
  }, [professionals])


  /** Events */

  // Click on each field
  const pressFieldHandler = async function () {
    const _field = this.value;
    console.log(_field)
    await fetchProfessionalsByField(_field);
  }

  // Adaptig professionals to dropdown Items format
  const setProfessionalsItems = () => {
    const newProfessionalsItems = createProfessionalItemsAdapter(professionals);
    setProfessionalItems(newProfessionalsItems);
  }

  // Click on professional
  const onSelectProfessional = (value: string) => {
    /** http request to fetch available schedules */
    //TODO
    /** Show the rest */
    setShowDependenElements(true);
  }

  // Click on date
  const onPressDate = (date: string) => {
    /**Set marked day and highlight it  */
    setMarkedDay(date);
    /**Filter and show frames */
    //TODO
  };

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
    //TODO
  };

  // Add pressFieldHandler function to catch each field's value and send the http request
  const servicesButtonsFormatted = servicesFn(pressFieldHandler);

  // Condional JSX
  const professionalsView = <View>
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
  </View>

  const calendar = <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <CustomCalendarComponent
        markedDay={markedDay}
        onPressDate={onPressDate}
        onChangeDate={onChange}
      />
    )}
    name="date"
  />

  const franjas = <View>
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <DropDownPicker
          addCustomItem={false}
          placeholder={'Selecciona una franja'}
          listMode="FLATLIST"
          open={openFranjas}
          value={dropDownFranjas}
          items={franjasItems}
          setOpen={setOpenFranjas}
          setValue={setDropDownFranjas}
          setItems={setFranjasItems}
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
  </View>

  const submitButtonFirstPart = <TouchableOpacity onPress={handleSubmit(onSubmitFirstPart)}>
    <View style={{ alignItems: 'center', marginTop: width * 0.02 }}>
      <View style={styles.buttonContinuar}>
        <Text style={{ ...styles.buttonContinuarText }}>Continuar</Text>
      </View>
    </View>
  </TouchableOpacity>

  return (
    <CardBienestar>
      <SafeAreaView style={styles.container}>
        <SegmentedButtonsResponsive
          buttons={servicesButtonsFormatted}
          value={field}
          onValueChange={setField}
        />
        {isLoadingProfessionals && <ActivityIndicator />}
        {!isLoadingProfessionals && professionalsView}
        {showDependentElements && calendar}
        {showDependentElements && franjas}
        {showDependentElements && submitButtonFirstPart}
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