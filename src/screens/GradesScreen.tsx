import React, { useEffect, useState } from 'react'

import { ActivityIndicator, View, LogBox, Text, Alert, StyleSheet, Appearance, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppBarComponent from '../components/AppBarComponent';

import { MateriaNota } from '../components/MateriaNota';

import { useNotas } from '../hooks/useNotas';
import { colores } from '../theme/appTheme';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreAllLogs();
export const GradesScreen = () => {

  const { isLoading, notasEstudiante, loadInfoEstudiante, setIsLoading } = useNotas();
  const [isEmpty, setIsEmpty] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  //pull to refresh
  const loadNotasFromBackend = async () => {
    //primero, ponemos la pantalla en modo de carga
    setIsRefreshing(true);
    setIsLoading(true);
    //cargamos la info
    await loadInfoEstudiante();
    //finalmente, ponemos la pantalla en modo false
    setIsRefreshing(false);
    setIsLoading(false);
  }

  return (
    <>
    <AppBarComponent title='Notas escolares'/>
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
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={loadNotasFromBackend}
                />}
              contentContainerStyle={styles.noInfo}
            >
              <Text>No hay notas del semestre actual disponibles, podrás observarlas después de las evaluaciones del corte 1.</Text>
            </ScrollView>
          )
          :
          (<ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={loadNotasFromBackend}
              />
            }
          >
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
    </>
    
  )
}

const styles = StyleSheet.create({
  noInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})