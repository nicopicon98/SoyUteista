import React from 'react'

import { Text, ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { Tutoria } from '../components/Tutoria';

import { useTutoriasAll } from '../hooks/useTutoriasAll'
import { colores } from '../theme/appTheme';

export const CitasTutoriasScreen = () => {

  const { isLoading, tutorias } = useTutoriasAll();

  return (
    <View>
      {isLoading && <ActivityIndicator
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        color={colores.Pantone_382_C}
        size='large' />
      }
      {!isLoading && <FlatList
        data={tutorias}
        keyExtractor={(tutoria, index) => `${tutoria.correo_tutor}${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <Tutoria item={item} />}
        ListFooterComponent={
          <View style={{ width: '100%', height: 28 }} />
        }
      />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  globalMargin: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold'
  }
});
