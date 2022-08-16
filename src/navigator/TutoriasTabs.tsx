import React, { useEffect, useState } from 'react'
import { Dimensions, ActivityIndicator, View, Text, StyleSheet, Appearance } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { colores } from '../theme/appTheme';
import { CrearCitaTutoriaScreen } from '../screens/CrearCitaTutoriaScreen';
import { CitasTutoriasScreen } from '../screens/CitasTutoriasScreen';


const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');
const colorScheme = Appearance.getColorScheme();

export const TutoriasTabs = () => {

  return (
    <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      <Tab.Navigator
        style={{
          paddingTop: 0
        }}
        sceneContainerStyle={{
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        }}
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: width * 0.035, fontWeight: '700', color: colorScheme === 'dark' ? 'white' : 'black' },
          tabBarPressColor: colores.Cool_Gray_5_C,
          tabBarShowIcon: true,
          tabBarIndicatorStyle: {
            backgroundColor: colores.Pantone_382_C
          },
          tabBarStyle: {
            borderTopColor: colores.Cool_Gray_5_C,
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: 'transparent',
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          },
          tabBarIcon: ({ focused, color }) => {

            let iconName: string = "create-outline";

            if (route.name === 'Crear Tutoría') {
              iconName = focused
                ? 'create'
                : 'create-outline';
            } else if (route.name === 'Tutorías Agendadas') {
              iconName = focused ? 'list' : 'list-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={25} color={colorScheme === 'dark' ? 'white' : colores.Pantone_382_C} />;
          },
          tabBarActiveTintColor: colores.White,
          tabBarInactiveTintColor: colores.Cool_Gray_5_C,
        })}
      >
        <Tab.Screen name="Crear Tutoría" component={CrearCitaTutoriaScreen} />
        <Tab.Screen name="Tutorías Agendadas" component={CitasTutoriasScreen} />
      </Tab.Navigator>
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