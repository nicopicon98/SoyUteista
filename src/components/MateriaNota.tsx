import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { AnimatedSection, useCollapsible } from 'reanimated-collapsible-helpers';
import { Definitiva, Notas } from '../interfaces/NotasInterface';
import { colores } from '../theme/appTheme';

type infoCorte =
	| "PRIMER CORTE"
	| "SEGUNDO CORTE"
	| "TERCER CORTE"
	| "definitiva"
	| string

interface Props {
	materia?: string;
	infoMateria: any;
}

type CorteValor = Definitiva & Notas;

interface Props2 {
	evaluacion: infoCorte;
	notas: Array<CorteValor> | number;
}

const MateriaNotaInfo = ({ evaluacion, notas }: Props2) => {
	return (
		<View style={{ ...styles.card }}>
			<Text style={styles.evaluacion}>{evaluacion}</Text>
			{typeof (notas) === "number" && <Text>{notas}</Text>}
			{typeof (notas) !== "number" && notas.map(e => {
				return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
					<Text style={{ fontSize: 16, textTransform: 'capitalize' }}>
						{e.N_NOTA_DESCRIPCION === 'EVALULACIÓN DEL CORTE'
							? 'EVALUACIÓN DEL CORTE'
							: e.N_NOTA_DESCRIPCION} {e.N_NOTA_PESO && (`${e.N_NOTA_PESO}%`)}:
					</Text>
					<Text style={{ fontWeight: 'bold' }}> {e.N_CALF_VALOR}</Text>
				</View>
			})}
		</View>
	)
}

export const MateriaNota = ({ materia, infoMateria }: Props) => {

	const { animatedHeight, height, onPress, onLayout, state } = useCollapsible();

	return (
		<View style={styles.background}>
			<View style={styles.overflow}>
				<TouchableOpacity onPress={onPress} style={styles.button}>
					<Text style={styles.buttonText}>{materia}</Text>
				</TouchableOpacity>
				<AnimatedSection
					animatedHeight={animatedHeight}
					onLayout={onLayout}
					state={state}
				>
					<View style={styles.textContainer}>
						{
							Object.keys(infoMateria).map(e => {
								return <MateriaNotaInfo evaluacion={e} notas={infoMateria[e]} />
							})
						}
					</View>
				</AnimatedSection>
			</View>
		</View>
	)
}



const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#efefef',
		padding: 10,
	},
	overflow: {
		overflow: 'hidden',
		backgroundColor: 'white',
		borderRadius: 6,
	},
	button: {
		padding: 10,
		textAlign: 'center',
	},
	buttonText: {
		fontSize: 18,
		marginLeft: 5
	},
	textContainer: {
		padding: 15,
	},
	card: {
		borderColor: colores.Blue_Dark,
		padding: 3,
		borderWidth: 1,
		marginBottom: 7
	},
	evaluacion: {
		fontSize: 16,
		borderBottomWidth: 1,
		borderColor: colores.Blue_Dark,
		color: colores.Blue_Dark
	}
});