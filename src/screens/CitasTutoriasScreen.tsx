import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react'

import { Text, ActivityIndicator, View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Tutoria } from '../components/Tutoria';

import { useTutoriasAll } from '../hooks/useTutoriasAll'
import { colores } from '../theme/appTheme';

export const CitasTutoriasScreen = ({ route, navigation }) => {

  const { isLoading, tutorias, loadTutorias } = useTutoriasAll();
  const isFocused = useIsFocused();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    loadTutorias()
  }, [isFocused])

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        color={colores.Pantone_382_C}
        size='large' />
      }
      {!isLoading && tutorias!.length !== 0 && <FlatList
        data={tutorias}
        keyExtractor={(tutoria, index) => `${tutoria.correo_tutor}${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <Tutoria item={item} />}
        ListFooterComponent={
          <View style={{ width: '100%', height: 28 }} />
        }
      />
      }
      {
        !isLoading && tutorias!.length === 0 &&
        (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: height * 0.08 }}>
          <Text>Aun no tienes tutorias agendadas</Text>
        </View>)
      }
    </View>
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
