import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { Dimensions, Pressable, View, Text, StyleSheet } from 'react-native';
import { DateData, DayState } from 'react-native-calendars/src/types';
import { dayToID, isBeforeToday, isDayOfTheWeek } from '@src/utilities';
import moment from 'moment';

interface Props {
	date: (string & DateData);
	dayWeek: string;
	state: DayState;
	marking: MarkingProps;
	onPressDate: (data: string) => void;
	onChangeDate: (data: string) => void;
}

const { width } = Dimensions.get('window');

export const CalendarSingleComponent =
	({
		date,
		dayWeek,
		onPressDate,
		marking,
		onChangeDate }: Props) => {
		const checkIsBeforeToday = isBeforeToday(date.dateString);
		const isDayWeekValid = dayWeek.length
		const checkIsDayOfTheWeek = isDayWeekValid && isDayOfTheWeek(date.dateString, dayWeek);
		return (
			<>
				{(
					!checkIsBeforeToday &&
					isDayWeekValid &&
					checkIsDayOfTheWeek)
					? <Pressable
						onPress={() => {
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
						<Text style={{ ...styles.textDisabled }}>{date.day}</Text>
					</View>
				}
			</>
		)
	}

const styles = StyleSheet.create({
	container: {
		padding: width * 0.006,
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