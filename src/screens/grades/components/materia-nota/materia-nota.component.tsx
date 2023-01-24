import { StyleSheet, TouchableOpacity, View, Text, Appearance, useWindowDimensions } from 'react-native';
import { AnimatedSection, useCollapsible } from 'reanimated-collapsible-helpers';
import { Corte, InfoMateria, InfoCorte } from '@src/models';
import { colores } from '@src/theme';

interface Props {
	materia: string;
	infoMateria: InfoMateria[];
}

interface Props2 {
	corte: Corte;
	infoCorte: Array<InfoCorte> | number;
}

const MateriaNotaInfo = ({ corte, infoCorte }: Props2) => {

	const { width } = useWindowDimensions();

	return (
		<View style={{
			borderColor: colores.Pantone_382_C,
			padding: width * 0.02,
			borderWidth: width * 0.004,
			marginBottom: width * 0.013
		}}>
			<Text style={{
				...styles.evaluacion,
				fontSize: width * 0.039,
				borderBottomWidth: 1,
			}}>{corte}</Text>
			{typeof (infoCorte) === "number" && (
				<Text style={{
					fontWeight: 'bold',
					color: 'black',
					fontSize: width * 0.034
				}}>
					{infoCorte}
				</Text>
			)}
			{typeof (infoCorte) !== "number" && infoCorte.map(e => {
				return <View style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginTop: width * 0.013
				}}>
					<Text style={{ fontSize: width * 0.039, textTransform: 'capitalize', color: 'black' }}>
						{e.N_NOTA_DESCRIPCION === 'EVALULACIÓN DEL CORTE'
							? 'EVALUACIÓN DEL CORTE'
							: e.N_NOTA_DESCRIPCION} {e.N_NOTA_PESO && (`${e.N_NOTA_PESO}%`)}:
					</Text>
					<Text style={{ fontWeight: 'bold', color: 'black' }}> {e.N_CALF_VALOR.toFixed(1)}</Text>
				</View>
			})}
		</View>
	)
}

export const MateriaNota = ({ materia, infoMateria }: Props) => {

	const { animatedHeight, onPress, onLayout, state } = useCollapsible();
	const colorScheme = Appearance.getColorScheme();
	const { width } = useWindowDimensions();

	return (
		<View style={{
			flex: 1,
			backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
			padding: width * 0.03,
		}}>
			<View style={{
				...styles.overflow,
				borderRadius: width * 0.02,
			}}>
				<TouchableOpacity onPress={onPress} style={{
					...styles.button,
					padding: width * 0.03,
				}}>
					<Text style={{
						fontSize: width * 0.048,
						marginLeft: width * 0.01,
						...styles.buttonText
					}}>
						{materia}
					</Text>
				</TouchableOpacity>
				<AnimatedSection
					animatedHeight={animatedHeight}
					onLayout={onLayout}
					state={state}
				>
					<View style={{
						paddingHorizontal: width * 0.041,
						paddingTop: width * 0.01,
						paddingBottom: width * 0.02
					}}>
						{
							infoMateria.map(e => {
								return <MateriaNotaInfo corte={e.corte} infoCorte={e.infoCorte} />
							})
						}
					</View>
				</AnimatedSection>
			</View>
		</View>
	)
}



const styles = StyleSheet.create({
	overflow: {
		overflow: 'hidden',
		backgroundColor: '#efefef',
	},
	button: {
		textAlign: 'center',
	},
	buttonText: {
		color: 'black',
		fontWeight: 'bold'
	},
	evaluacion: {
		borderColor: colores.Pantone_382_C,
		color: colores.Pantone_382_C,
		fontWeight: 'bold'
	}
});