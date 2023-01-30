import { createProfessionalItemsAdapter, insertCitaBienestarAdapter } from "./adapters";
import { StyleSheet, Text, Dimensions, View, Pressable } from 'react-native';
import { SegmentedButtonsResponsive } from "./components/segmented-buttons";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { CardBienestar } from "@src/components/card-bienestar"
import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from '@src/context';
import { useGetProByField } from "./hooks";
import { servicesFn } from "./data";
import { colores } from "@src/theme";
import { Calendar } from "react-native-calendars";
import { isBeforeToday } from "@src/utilities";
import { CustomCalendarComponent } from "./components/custom-calendar";

export type FormData = {
  id_usuario: string;
  student_celphone: string;
  id_horario: string;
  date: string;
};

const { width } = Dimensions.get('window')
const d = new Date();
export const CrearCitaBienestarScreen = () => {
  const [field, setField] = useState<string>('odontologia');
  const [openProfessionals, setOpenProfessionals] = useState(false);
  const [dropDownProfessionals, setDropDownProfessionals] = useState('');
  const [professionalItems, setProfessionalItems] = useState<ItemType<string>[]>([])
  const { authState: { user } } = useContext(AuthContext);

  //Calendar
  const [markedDay, setMarkedDay] = useState('');
  // const [dayWeek, setDayWeek] = useState(d.getDay() === 0 ? 0 : d.getDay() - 1);

  //Conditional rendering
  const [showDependentElements, setShowDependenElements] = useState(false);

  const {
    fetchProfessionalsByField,
    professionals,
    isLoadingProfessionals
  } = useGetProByField();

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

  const pressFieldHandler = async function () {
    const _field = this.value;
    console.log(_field)
    await fetchProfessionalsByField(_field);
  }

  const setProfessionalsItems = () => {
    const newProfessionalsItems = createProfessionalItemsAdapter(professionals);
    setProfessionalItems(newProfessionalsItems);
  }

  const onSelectProfessional = (value: string) => {
    //Show the rest
    setShowDependenElements(true);
    console.log(value);
  }

  //Click on date
  const onPressDate = (date: string) => {
    console.log(date)
    setMarkedDay(date);
  };

  const onSubmitFirstPart = async (data: FormData) => {
    const { id_horario, student_celphone: userStudentCelphone } = data;
    const userStudentEmail = user!.userEmail;
    const obj = insertCitaBienestarAdapter({ id_horario, userStudentCelphone, userStudentEmail })
    console.log("sending", obj)
  };

  useEffect(() => {
    setProfessionalsItems();
  }, [professionals])

  const servicesButtons = servicesFn(pressFieldHandler);

  const professionalsView = <View style={{ height: width * 0.25 }}>
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
          buttons={servicesButtons}
          value={field}
          onValueChange={setField}
        />
        {isLoadingProfessionals && <ActivityIndicator />}
        {!isLoadingProfessionals && professionalsView}
        {showDependentElements && calendar}
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