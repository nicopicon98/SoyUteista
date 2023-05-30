import { Dimensions, View, StyleSheet, Appearance } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { CalendarSingleComponent } from '../calendar-single';
import { colores } from '@src/theme';
import { Component } from 'react'

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
	dayWeek: string;
	onPressDate: (data: string) => void;
	onChangeDate: (data: string) => void;
}

const { width } = Dimensions.get('window');
const colorSchema = Appearance.getColorScheme();
export class CustomCalendarComponent extends Component<IProps> {

	constructor(props: IProps) {
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
			onChangeDate,
		} = this.props;
		return (
			<View style={{ alignSelf: 'center' }}>
				{/* Close modal */}
				<Calendar
					theme={{
						calendarBackground: colorSchema === 'dark' ? 'black' : 'white',
					}}
					style={{ backgroundColor: colorSchema === 'dark' ? 'black' : 'white' }}
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
		alignItems: 'center',
		justifyContent: 'center',
		width: width * 0.07,
	},
	markedStylesText: {
		color: colores.White,
		textAlign: 'center',
		padding: 1
	}
})