import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { UserContext } from '../context/UserContext';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { useAccess } from '../hooks/useAccess';
import { colores } from '../theme/appTheme';
import { NavigationProps } from '../types/navigation';
import { ScheduleTabs } from './ScheduleTabs';

const Drawer = createDrawerNavigator();

export const DrawerMenuContent = ({ navigation }: NavigationProps) => {

  const { width, height } = useWindowDimensions();

  //access me setea la info del usuario que tengo hasta ahora, la idea es aca poner el resto de informacion del usuario, TODO
  const { access, state } = useAccess();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    //cuando carga la app, seteamos el valor del usuario
    access()
      .catch(console.error);
  }, [])

  return (
    <UserContext.Provider value={state}>
      <Drawer.Navigator
        drawerType={(width >= 768) ? 'permanent' : 'front'}
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: colores.Pantone_382_C },
          headerTintColor: 'white'
        }}
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            userName={state.userFullName}
            userEmail={state.userEmail}
            userPhoto={state.userPhoto}
            height={height}
          />
        )}>

        <Drawer.Screen name='Inicio' component={HomeScreen} options={{ headerTitle: 'Soy Uteista' }} />
        <Drawer.Screen name='Calendario' component={CalendarScreen} options={{ headerTitle: 'Calendario' }} />
        <Drawer.Screen name='Horario' component={ScheduleTabs} options={{ headerTitle: 'Horario' }} />

      </Drawer.Navigator>
    </UserContext.Provider>
  );
}

export {}