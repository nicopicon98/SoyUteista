import React, { useEffect, useState } from 'react'

import { ActivityIndicator, View, LogBox, Text, Alert, StyleSheet, Appearance } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MateriaNota } from '../components/MateriaNota';

import { useNotas } from '../hooks/useNotas';
import { colores } from '../theme/appTheme';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreAllLogs();
export const GradesScreen = () => {

  const { isLoading, notasEstudiante } = useNotas();
  const [isEmpty, setIsEmpty] = useState(true);
  const colorScheme = Appearance.getColorScheme();
  if (isLoading === false) console.log(notasEstudiante);

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(notasEstudiante)) return setIsEmpty(false);
      if (Object.keys(notasEstudiante!).length === 0) {
        setIsEmpty(true);
        Alert.alert(
          "Mensaje:",
          "No hay notas del semestre actual disponibles, podrás observarlas después de las evaluaciones del corte 1.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
  }, [isLoading])

  return (
    <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      {isLoading
        ? <ActivityIndicator
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          color={colorScheme === 'dark' ? 'white' : colores.Pantone_382_C}
          size='large'
        />
        :
        (isEmpty && !Array.isArray(notasEstudiante)
          ? (
            <View style={styles.noInfo}>
              <Text>No hay notas del semestre actual disponibles, podrás observarlas después de las evaluaciones del corte 1.</Text>
            </View>
          )
          :
          (<ScrollView>
            {
              notasEstudiante!.map(e => {
                return <MateriaNota materia={e.materia} infoMateria={e.infoMateria} />
              })
            }
          </ScrollView>
          )
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  noInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})