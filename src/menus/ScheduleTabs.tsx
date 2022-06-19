import React, { useEffect, useState } from 'react'
import { Dimensions, ActivityIndicator, View, Text, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colores } from '../theme/appTheme';
import { DayScreen } from '../screens/DayScreen';
import { useHorario } from '../hooks/useHorario';
import { MateriaInterface } from '../interfaces/horarioInterface';
import { materias } from '../helpers/persistence';

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

export const ScheduleTabs = () => {

  // const { isLoading, materias } = useHorario();

  //Simulating
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  })


  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator style={styles.loader} color={colores.Pantone_382_C} animating={isLoading} size='large' />}
      {!isLoading &&
        <Tab.Navigator
          style={{
            paddingTop: 0
          }}
          sceneContainerStyle={{
            backgroundColor: 'white'
          }}
          screenOptions={() => ({
            tabBarLabelStyle: { fontSize: width * 0.04, fontWeight: '700' },
            tabBarPressColor: colores.Cool_Gray_5_C,
            tabBarShowIcon: true,
            tabBarIndicatorStyle: {
              backgroundColor: colores.Cool_Gray_5_C
            },
            tabBarStyle: {
              borderTopColor: colores.Cool_Gray_5_C,
              borderTopWidth: 0,
              elevation: 0,
              shadowColor: 'transparent',
            }
          })}
        >

          <Tab.Screen name="Lun">
            {() => <DayScreen materias={materias.filter(e => e.DIA == 1)} />}
          </Tab.Screen>
          <Tab.Screen name="Mar">
            {() => <DayScreen materias={materias.filter(e => e.DIA == 2)} />}
          </Tab.Screen>
          <Tab.Screen name="Mie">
            {() => <DayScreen materias={materias.filter(e => e.DIA == 3)} />}
          </Tab.Screen>
          <Tab.Screen name="Jue">
            {() => <DayScreen materias={materias.filter(e => e.DIA == 4)} />}
          </Tab.Screen>
          <Tab.Screen name="Vie">
            {() => <DayScreen materias={materias.filter(e => e.DIA == 5)} />}
          </Tab.Screen>
          <Tab.Screen name="Sab">
            {() => <DayScreen materias={materias.filter(e => e.DIA == 6)} />}
          </Tab.Screen>
        </Tab.Navigator>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});