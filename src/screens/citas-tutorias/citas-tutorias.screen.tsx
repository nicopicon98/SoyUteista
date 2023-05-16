import { Text, ActivityIndicator, View, FlatList, StyleSheet, useWindowDimensions, Appearance } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Tutoria } from './components/tutoria';
import { useTutorias } from './hooks';
import { colores } from '@src/theme';
import { useEffect } from 'react'

const colorScheme = Appearance.getColorScheme();

export const CitasTutoriasScreen = () => {

  const { isLoading, tutorias, loadTutorias } = useTutorias();
  const isFocused = useIsFocused();
  const { height } = useWindowDimensions();

  useEffect(() => {
    loadTutorias()
  }, [isFocused])

  return (
    <>
      <View style={{ flex: 1 }}>
        {isLoading && <ActivityIndicator
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          color={colores.Pantone_382_C}
          size='large' />
        }
        {!isLoading && tutorias!.length !== 0 &&
          <FlatList
            data={tutorias}
            keyExtractor={(tutoria, index) => `${tutoria.correo_tutor}${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Tutoria item={item} />}
            ListFooterComponent={
              <View style={{ width: '100%', height: 28 }} />
            }
          />
        }
        {
          !isLoading && tutorias!.length === 0 &&
          (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: height * 0.08 }}>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Aun no tienes tutorías agendadas</Text>
          </View>)
        }
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold'
  }
});
