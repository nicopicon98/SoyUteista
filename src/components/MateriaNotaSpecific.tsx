import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { AnimatedSection, useCollapsible } from 'reanimated-collapsible-helpers';
import { Notas } from '../interfaces/NotasInterface';
import { evaluacionType } from '../types/evaluacion';

interface Props {
	evaluacion: evaluacionType;
	infoEvaluacion?: Array<Notas>;
}

export const MateriaNotaSpecific = ({ evaluacion, infoEvaluacion }: Props) => {

	const { animatedHeight, height, onPress, onLayout, state } = useCollapsible();

	return (
		<View style={styles.background}>
			<View style={styles.overflow}>
				<TouchableOpacity onPress={onPress} style={styles.button}>
					<Text style={{ ...styles.buttonText, textTransform: 'uppercase' }}>{evaluacion}</Text>
				</TouchableOpacity>
				<AnimatedSection
					animatedHeight={animatedHeight}
					onLayout={onLayout}
					state={state}
				>
					<View style={styles.textContainer}>
						{evaluacion !== 'Nota Final' && infoEvaluacion!.map(e => {
							if (e.N_NOTA_DESCRIPCION === 'AUTOEVALUACIÓN') {
								return (
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ fontWeight: 'bold' }}>Autoevaluación ({e.N_NOTA_PESO}%): </Text>
										<Text>{e.N_CALF_VALOR}</Text>
									</View>
								)
							}
							if (e.N_NOTA_DESCRIPCION === 'TAREAS TIEMPO INDEPENDIENTE') {
								return (
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ fontWeight: 'bold' }}>Tareas tiempo independiente ({e.N_NOTA_PESO}%): </Text>
										<Text>{e.N_CALF_VALOR}</Text>
									</View>
								)
							}
							if (e.N_NOTA_DESCRIPCION === 'EVALULACIÓN DEL CORTE') {
								return (
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ fontWeight: 'bold' }}>Evaluación del corte ({e.N_NOTA_PESO}%): </Text>
										<Text>{e.N_CALF_VALOR}</Text>
									</View>
								)
							}
						})}

						{evaluacion === 'Nota Final' && (
							<Text style={{ fontWeight: 'bold' }}>Nota final: </Text>
						)}
					</View>
				</AnimatedSection>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
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
		fontSize: 16,
	},
	textContainer: {
		padding: 15,
	},
});