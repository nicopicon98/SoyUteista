import {ProfessionalScheduleCalendar} from './components/professional-schedule-calendar';
import {useGetUpcomingUsersScheduleByCampusField} from './hooks';
import {FieldsDropdown} from './components/fields-dropdown';
import {useGetAllFieldsByCampus} from './hooks';
import {TBienestarFormData} from './models';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {CardBienestar} from '@src/components/card-bienestar';
import {StyleSheet, Appearance, Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colores} from '@src/theme';
import {Text} from 'react-native';
import {View} from 'react-native-animatable';
import {SlotsDropdown} from './components/slots-dropdown';
import {useMapSlotsToItems} from './hooks';
import {useMapProfessionalsToItems} from './hooks/use-map-professionals-to-items.hook';
import {ProfessionalsDropdown} from './components/professionals-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';

const colorScheme = Appearance.getColorScheme();
const {width} = Dimensions.get('window');
export const CrearCitaBienestarScreen = () => {
  //btnContinuar states
  const [isLoadingBtnContinuar, setIsLoadingBtnContinuar] =
    useState<boolean>(false);

  //professionals schedule, timeslots and names visibility
  const [isVisible, setIsVisible] = useState(false);

  //slots
  const [openSlots, setOpenSlots] = useState<boolean>(false);
  const {mapSlotsToItemsHandler, slotsMapped} = useMapSlotsToItems();
  const clickSlotItemHandler = (id_time_slot: string) => {
    console.log(id_time_slot);
    mapProfessionalsToItemsHandler(
      control._formValues.date!,
      +id_time_slot,
      upcomingUsersScheduleRaw!,
    );
    //let's clear the form values
    reset({
      ...control._formValues,
      id_time_slot: '',
    });
    //let's clear the shown on the dropdownpicker values
    setDropDownProfessionals('');
  };

  //professionals
  const [openProfessionals, setOpenProfessionals] = useState<boolean>(false);
  const [dropDownProfessionals, setDropDownProfessionals] =
    useState<string>('');
  const {professionalsMapped, mapProfessionalsToItemsHandler} =
    useMapProfessionalsToItems();
  const clickProfessionalItemHandler = (v: string) => {
    console.log(v);
  };

  //fields
  const [openFields, setOpenFields] = useState<boolean>(false);
  const [dropDownSlots, setDropDownSlots] = useState<string>('');
  const {fields, rawFields, isLoadingFields} = useGetAllFieldsByCampus();

  //professionals schedule
  const {
    fetchAllUpcomingUsersSchedule,
    upcomingUsersScheduleMapped,
    upcomingUsersScheduleRaw,
    isLoadingUspcomingUsersSchedule,
  } = useGetUpcomingUsersScheduleByCampusField();

  //Calendar
  const [markedDay, setMarkedDay] = useState<string>('');

  const pressDateHandler = async (date: string) => {
    setMarkedDay(date);
    mapSlotsToItemsHandler(date, upcomingUsersScheduleRaw!);
    //let's clear the form values
    reset({
      ...control._formValues,
      id_campus_field: '',
      id_time_slot: '',
    });
    //let's clear the shown on the dropdownpicker values
    setDropDownSlots('');
    setDropDownProfessionals('');
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<TBienestarFormData>({
    defaultValues: {
      id_campus_field: '',
    },
  });

  //click on item
  const clickFieldItemHandler = async (value: string): Promise<void> => {
    fetchAllUpcomingUsersSchedule(value);
    setIsVisible(true);
    //let's clear the form values
    reset({
      ...control._formValues,
      date: '',
      id_campus_field: '',
      id_time_slot: '',
    });
    //let's clear the shown on the dropdownpicker values
    setMarkedDay('');
    setDropDownSlots('');
    setDropDownProfessionals('');
  };

  //components
  const fieldsDropdown = isLoadingFields ? (
    <View style={styles.container}>
      <ActivityIndicator
        color={colorScheme === 'dark' ? 'white' : colores.Pantone_382_C}
        animating={isLoadingFields}
        size="large"
      />
      <Text>Obteniendo la informacion de los profesionales...</Text>
    </View>
  ) : (
    <FieldsDropdown
      control={control}
      openFields={openFields}
      setOpenFields={setOpenFields}
      items={fields}
      onClickFieldItem={clickFieldItemHandler}
    />
  );

  const slotsDropdown = (
    <SlotsDropdown
      control={control}
      openSlots={openSlots}
      setOpenSlots={setOpenSlots}
      items={slotsMapped}
      onClickSlotItem={clickSlotItemHandler}
      dropDownSlots={dropDownSlots}
      setDropDownSlots={setDropDownSlots}
    />
  );

  const professionalsDropdown = (
    <ProfessionalsDropdown
      control={control}
      items={professionalsMapped}
      onClickProfessionalItem={clickProfessionalItemHandler}
      openProfessionals={openProfessionals}
      setOpenProfessionals={setOpenProfessionals}
      dropDownProfessionals={dropDownProfessionals}
      setDropDownProfessionals={setDropDownProfessionals}
    />
  );

  const onSubmitFirstPart = () => {
    console.log("it's working");
  };

  const isFormValid = () =>
    Object.values(control._formValues).every(val => val !== '');

  console.log('isFormValid', isFormValid);

  const submitBtnContinueView = (
    <View
      style={{
        marginTop: width * 0.03,
        marginBottom: width * 0.05,
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onSubmitFirstPart}
        disabled={!isFormValid()}>
        <View style={{alignItems: 'center', marginTop: width * 0.02}}>
          <View style={styles.buttonContinuar}>
            {isLoadingBtnContinuar ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{...styles.buttonContinuarText}}>Continuar</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const showProfessionalSchedule = isVisible;
  const professionalScheduleCalendar = showProfessionalSchedule ? (
    isLoadingUspcomingUsersSchedule ? (
      <View>
        <ActivityIndicator
          style={{marginTop: 10}}
          color={colores.Pantone_382_C}
          animating={isLoadingUspcomingUsersSchedule}
          size="large"
        />
        <Text>Trayendo fechas disponibles...</Text>
      </View>
    ) : upcomingUsersScheduleRaw?.length ? (
      <>
        <ProfessionalScheduleCalendar
          control={control}
          markedDay={markedDay}
          onPressDate={pressDateHandler}
          upcomingUsersScheduleMapped={upcomingUsersScheduleMapped}
        />
        {slotsDropdown}
        {professionalsDropdown}
        {submitBtnContinueView}
      </>
    ) : (
      <Text style={{marginTop: width * 0.5}}>
        Lo sentimos, no hay fechas disponibles para esa area de la salud
      </Text>
    )
  ) : (
    <></>
  );

  //form-values
  console.log(control._formValues, 'control._fields');

  //available dates
  // console.log(upcomingUsersScheduleRaw, 'upcomingUsersScheduleRaw');
  // console.log(upcomingUsersScheduleMapped, 'upcomingUsersSchedule');

  return (
    <CardBienestar>
      {fieldsDropdown}
      {professionalScheduleCalendar}
    </CardBienestar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: colores.White,
  },
});
