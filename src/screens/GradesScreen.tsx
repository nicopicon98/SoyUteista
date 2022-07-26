import React, { useState } from 'react'
import { ActivityIndicator, View, LogBox, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import { useNotas } from '../hooks/useNotas';
import { colores } from '../theme/appTheme';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreAllLogs();
export const GradesScreen = () => {

  const { isLoading, notasEstudiante } = useNotas();
  if (isLoading === false) console.log(notasEstudiante);  

  return (
    <View style={{ flex: 1 }}>
      {isLoading
        ? <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} color={colores.Pantone_382_C} size='large' />
        : <ScrollView>
          {
            <Text>{ JSON.stringify(notasEstudiante, null, 2) }</Text>
          }
        </ScrollView>
      }
    </View>
  )
}