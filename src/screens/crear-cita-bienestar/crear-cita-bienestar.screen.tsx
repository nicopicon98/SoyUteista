import {ProfessionalScheduleCalendar} from './components/professional-schedule-calendar';
import {useGetUpcomingUsersScheduleByCampusField} from './hooks';
import {FieldsDropdown} from './components/fields-dropdown';
import {useGetAllFieldsByCampus} from './hooks';
import {TBienestarFormData} from './models';
import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';
import {CardBienestar} from '@src/components/card-bienestar';
import {StyleSheet, Appearance, Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colores} from '@src/theme';
import {Text} from 'react-native';
import {View} from 'react-native-animatable';

const colorScheme = Appearance.getColorScheme();
const {width} = Dimensions.get('window');
export const CrearCitaBienestarScreen = () => {
  //fields
  const [openFields, setOpenFields] = useState(false);
  const {fields, rawFields, isLoadingFields} = useGetAllFieldsByCampus();

  //professionals schedule, timeslots and names visibility
  const [isVisible, setIsVisible] = useState(false);

  //professionals schedule
  const {
    fetchAllUpcomingUsersSchedule,
    upcomingUsersScheduleMapped,
    upcomingUsersScheduleRaw,
    isLoadingUspcomingUsersSchedule,
  } = useGetUpcomingUsersScheduleByCampusField();

  //Calendar
  const [markedDay, setMarkedDay] = useState('');

  const pressDateHandler = async (date: string) => {
    setMarkedDay(date);
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
      <ProfessionalScheduleCalendar
        control={control}
        markedDay={markedDay}
        onPressDate={pressDateHandler}
        upcomingUsersScheduleMapped={upcomingUsersScheduleMapped}
      />
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
  console.log(upcomingUsersScheduleRaw, 'upcomingUsersScheduleRaw');
  console.log(upcomingUsersScheduleMapped, 'upcomingUsersSchedule');

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
});
