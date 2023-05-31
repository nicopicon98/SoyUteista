import React, {useState} from 'react';
import {StyleSheet, Dimensions, Appearance, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {CalendarDay} from '../calendar-day';
import {colores} from '@src/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

LocaleConfig.locales['es'] = {
	monthNames: [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	],
	monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
	dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
	today: "Hoy"
};
LocaleConfig.defaultLocale = 'es';

interface IProps {
  markedDay: string;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
  upcomingUsersScheduleMapped: string[];
}

const {width} = Dimensions.get('window');

export const ScheduleCalendar = ({
  markedDay,
  onChangeDate,
  onPressDate,
  upcomingUsersScheduleMapped,
}: IProps) => {
  const colorSchema = Appearance.getColorScheme();
  return (
    <View style={{alignSelf: 'center'}}>
      <Calendar
        theme={{
          calendarBackground: colorSchema === 'dark' ? 'black' : 'white',
        }}
        style={{
          backgroundColor: colorSchema === 'dark' ? 'black' : 'white',
          width: width * 0.9,
        }}
        markingType={'custom'}
        hideExtraDays={true}
        showTodayButton={true}
        markedDates={{
          [markedDay]: {
            customStyles: {
              container: styles.markedStylesContainer,
              text: styles.markedStylesText,
            },
          },
        }}
        dayComponent={({date, state, marking}) => {
          return (
            <CalendarDay
              date={date!}
              onPressDate={onPressDate}
              marking={marking!}
              onChangeDate={onChangeDate}
              state={state!}
              upcomingUsersScheduleMapped={upcomingUsersScheduleMapped}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  markedStylesContainer: {
    backgroundColor: colores.Pantone_383_C,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.07,
  },
  markedStylesText: {
    color: colores.White,
    textAlign: 'center',
    padding: 1,
  },
});
