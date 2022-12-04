import React, { Component } from 'react'
import { Dimensions, Pressable, View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda, DateData, LocaleConfig } from 'react-native-calendars';
import { getPreviousDay } from '../helpers/functions';
import { colores } from '../theme/appTheme';
import { CalendarSingleComponent } from './CalendarSingleComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

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

interface Props {
	markedDay: string;
	dayWeek: number;
	onPressDate: (data: string) => void;
	setModalVisible: (bool: boolean) => void;
	onChangeDate: (data: string) => void;
}

const { width, height } = Dimensions.get('window');

export class CustomCalendarComponent extends Component<Props> {

	constructor(props: Props) {
		super(props);
		this.state = {
			isCurrentMonth: true
		}
	}

	render() {
		const {
			markedDay,
			dayWeek,
			onPressDate,
			setModalVisible,
			onChangeDate,
		} = this.props;
		return (
			<View style={{ alignSelf: 'center'}}>
				{/* Close modal */}
				<Calendar
					markingType={"custom"}
					// headerStyle={{backgroundColor: 'red'}}
					hideExtraDays={true}
					// customHeaderTitle={<Text>"Xd"</Text>}
					// disableArrowLeft={this.state.isCurrentMonth!}
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
							<CalendarSingleComponent
								date={date!}
								dayWeek={dayWeek}
								marking={marking!}
								onPressDate={onPressDate}
								state={state!}
								onChangeDate={onChangeDate}
							/>
						);
					}}
				/>
				
			</View>
		)
	}
}


const styles = StyleSheet.create({
	buttonClose: {
		position: 'absolute',
		right: 10,
		top: 10,
		zIndex: 1000
	},
	buttonGuardar: {
		backgroundColor: colores.Pantone_383_C,
		paddingVertical: width * 0.015,
		paddingHorizontal: width * 0.02,
		borderRadius: 100,
	},
	buttonGuardarText: {
		fontSize: width * 0.04, color: 'white'
	},
	buttonGuardarContentChild: {
		width: width * 0.19, zIndex: 2000
	},
	buttonGuardarContent: {
		flexDirection: 'row-reverse', right: width * 0.03, top: width * 0.02
	},
	markedStylesContainer: {
		backgroundColor: colores.Pantone_383_C,
		borderRadius: 100,
		width: width * 0.07,
	},
	markedStylesText: {
		color: 'white',
		textAlign: 'center',
	}
})