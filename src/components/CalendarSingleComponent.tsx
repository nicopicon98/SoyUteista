import React, { useEffect } from 'react'
import { Dimensions, Pressable, View, Text, StyleSheet } from 'react-native';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { DateData, DayState } from 'react-native-calendars/src/types';
import { getPreviousDay } from '../helpers/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colores } from '../theme/appTheme';

interface Props {
	date: (string & DateData);
	dayWeek: number;
	state: DayState;
	marking: MarkingProps;
	onPressDate: (data: string) => void;
	onChangeDate: (data: string) => void;
}

const { width, height } = Dimensions.get('window');

export const CalendarSingleComponent = ({ date, dayWeek, onPressDate, state, marking, onChangeDate }: Props) => {
	let date2 = new Date(date!.dateString);
	let actualDate = new Date();
	actualDate.setHours(0, 0, 0, 0)
	const actualMonth = actualDate.getMonth() + 1 < 10 ? "0" + (actualDate.getMonth() + 1) : actualDate.getMonth() + 1
	const today = actualDate.getFullYear() + "-" + actualMonth + "-" + actualDate.getDate()
	return (
		<View>
			{(date2.getDay() === dayWeek &&
				state !== 'disabled' &&
				(date2.getTime() >= actualDate.getTime() || date.dateString === today)) // si esto llega a fallar lo que va despues del or poner date.dateString === today 
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: width * 0.01
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