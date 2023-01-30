import { CustomDay } from '../day/custom-day.component';
import { StyleSheet, Dimensions } from 'react-native';
import { Calendar } from "react-native-calendars";
import { colores } from "@src/theme";

interface Props {
  markedDay: string;
  onPressDate: (data: string) => void;
  onChangeDate: (data: string) => void;
}

const {width, height} = Dimensions.get("window");

export const CustomCalendarComponent = ({ markedDay, onPressDate, onChangeDate }: Props) => {
  return (
    <Calendar
      style={{width: width*0.9}}
      markingType={"custom"}
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
      dayComponent={({ date, state, marking }) => {
        return (
          <CustomDay
            date={date!}
            marking={marking!}
            onPressDate={onPressDate}
            state={state!}
            onChangeDate={onChangeDate}
          />
        );
      }}
    />
  )
}

const styles = StyleSheet.create({
  markedStylesContainer: {
    backgroundColor: colores.Pantone_383_C,
    borderRadius: 100,
    width: width * 0.07,
  },
  markedStylesText: {
    color: 'white',
    textAlign: 'center',
  },
})