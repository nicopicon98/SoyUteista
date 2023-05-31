import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';
import {DateData, DayState} from 'react-native-calendars/src/types';
import {
  Appearance,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {isBeforeToday} from '@src/utilities';
import {Text} from 'react-native-paper';

interface IProps {
  date: string & DateData;
  state: DayState;
  marking: MarkingProps;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
  upcomingUsersScheduleMapped: string[];
}

const {width} = Dimensions.get('window');
const colorSchema = Appearance.getColorScheme();
export const CalendarDay = ({
  date,
  onPressDate,
  marking,
  upcomingUsersScheduleMapped,
  onChangeDate,
}: IProps) => {
  const isAvailable =
    isBeforeToday(date.dateString) &&
    upcomingUsersScheduleMapped.includes(date.dateString);
  console.log(upcomingUsersScheduleMapped, 'upcomingUsersScheduleMapped');
  console.log(date.dateString, 'date.dateString');
  return (
    <>
      {isAvailable ? (
        <Pressable
          onPress={() => {
            onPressDate(date!.dateString);
            onChangeDate(date!.dateString);
          }}>
          <View
            style={{...styles.container, ...marking?.customStyles?.container}}>
            <Text
              style={{...styles.textActive, ...marking?.customStyles?.text}}>
              {date?.day}
            </Text>
          </View>
        </Pressable>
      ) : (
        <View style={{...styles.container}}>
          <Text style={{...styles.textDisabled}}>{date.day}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.006,
  },
  textActive: {
    color: colorSchema === 'dark' ? 'white' : 'black',
    fontWeight: 'bold',
  },
  textDisabled: {
    textAlign: 'center',
    color: 'gray',
  },
});
