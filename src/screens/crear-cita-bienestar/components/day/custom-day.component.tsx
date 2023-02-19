import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { Pressable, View, Text, Dimensions, StyleSheet } from 'react-native';
import { DateData, DayState } from 'react-native-calendars/src/types';
import { existsObject, isBeforeToday } from "@src/utilities";

const { width } = Dimensions.get("window")

interface IProps {
  date: (string & DateData);
  state: DayState;
  marking: MarkingProps;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
  availableDates: { date: string }[];
}
export const CustomDay =
  ({ date, onPressDate, marking, onChangeDate, availableDates }: IProps) => {

    const validDates = existsObject(availableDates, "date", date.dateString)
    const checkIsBeforeToday = isBeforeToday(date.dateString)

    return (
      <View>
        {(!checkIsBeforeToday && validDates)
          ? <Pressable onPress={() => {
            onPressDate(date!.dateString)
            onChangeDate(date!.dateString)
          }}>
            <View style={{ ...styles.container, ...marking?.customStyles?.container }}>
              <Text
                style={{ ...styles.textActive, ...marking?.customStyles?.text }}
              >
                {date?.day}
              </Text>
            </View>
          </Pressable>
          : <View style={{ ...styles.container }}>
            <Text style={{ ...styles.textDisabled }}>{date?.day}</Text>
          </View>
        }
      </View>)
  }

const styles = StyleSheet.create({
  container: {
    padding: width * 0.00
  },
  textActive: {
    color: 'black',
    fontWeight: 'bold',
  },
  textDisabled: {
    textAlign: 'center',
    color: 'gray',
  }
})