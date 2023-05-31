import {colores} from '@src/theme';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Calendar} from 'react-native-calendars';
import {CalendarDay} from '../calendar-day';

interface IProps {
  markedDay: string;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
  upcomingUsersScheduleMapped: string[]
}
const {width} = Dimensions.get('window');
export const ScheduleCalendar = ({
  markedDay,
  onChangeDate,
  onPressDate,
  upcomingUsersScheduleMapped
}: IProps) => {
  const colorSchema = Appearance.getColorScheme();
  return (
    <View style={{alignSelf: 'center'}}>
      <Calendar
        theme={{
          calendarBackground: colorSchema === 'dark' ? 'black' : 'white',
        }}
        style={{backgroundColor: colorSchema === 'dark' ? 'black' : 'white', width: width *0.9}}
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
