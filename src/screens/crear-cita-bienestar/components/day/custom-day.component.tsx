import { isBeforeToday } from "@src/utilities";
import { Pressable, View, Text, Dimensions, StyleSheet } from 'react-native';
import { DateData, DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

const { width } = Dimensions.get("window")

interface Props {
  date: (string & DateData);
  state: DayState;
  marking: MarkingProps;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
}
export const CustomDay =({ date, onPressDate, marking, onChangeDate }: Props) => {
    const dateFormmatted = new Date(date!.dateString);

    return (
      <View>
        {(!isBeforeToday(dateFormmatted))
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
          : <View style={{ ...styles.container}}>
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