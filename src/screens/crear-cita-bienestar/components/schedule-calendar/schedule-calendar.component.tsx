import {colores} from '@src/theme';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Calendar} from 'react-native-calendars';
import {CalendarDay} from '../calendar-day';

interface IProps {
  markedDay: string;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
}
const {width} = Dimensions.get('window');
export const ScheduleCalendar = ({
  markedDay,
  onChangeDate,
  onPressDate,
}: IProps) => {
  const colorSchema = Appearance.getColorScheme();
  return (
    <View style={{alignSelf: 'center'}}>
      <Calendar
        theme={{
          calendarBackground: colorSchema === 'dark' ? 'black' : 'white',
        }}
        style={{backgroundColor: colorSchema === 'dark' ? 'black' : 'white'}}
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
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonClose: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1000,
  },
  buttonGuardar: {
    backgroundColor: colores.Pantone_383_C,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.02,
    borderRadius: 100,
  },
  buttonGuardarText: {
    fontSize: width * 0.04,
    color: 'white',
  },
  buttonGuardarContentChild: {
    width: width * 0.19,
    zIndex: 2000,
  },
  buttonGuardarContent: {
    flexDirection: 'row-reverse',
    right: width * 0.03,
    top: width * 0.02,
  },
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
