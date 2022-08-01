import React, { useContext, useEffect } from 'react';
import { Appearance, useWindowDimensions } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';


import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { colores } from '../theme/appTheme';
import { ScheduleTabs } from './ScheduleTabs';
import { TutoriasTabs } from './TutoriasTabs';
import { AuthContext } from '../context/AuthContext';

import { HomeScreen } from '../screens/HomeScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { CarnetScreen } from '../screens/CarnetScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { GradesScreen } from '../screens/GradesScreen';
import { RevistaScreen } from '../screens/RevistaScreen';
import { AgendaInstitucionalScreen } from '../screens/AgendaInstitucionalScreen';
import { TutoriasTemporal } from '../screens/TutoriasTemporal';

const Drawer = createDrawerNavigator();

export const LeftMenu = () => {

  const { width, height } = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();

  const { authState, authState: { user } } = useContext(AuthContext)

  return (
    <Drawer.Navigator
      drawerType={(width >= 768) ? 'permanent' : 'front'}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colores.Pantone_382_C,
        },
        headerTintColor: 'white',
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userName={user!.userFullName}
          userEmail={user!.userEmail}
          userPhoto={user!.userPhoto}
          height={user!.userResult !== 1 ? height * 0.62 : height * 0.73}
          userPhotoError={user!.userPhotoError}
          userResult={user!.userResult}
          darkMode={colorScheme}
        />
      )}>

      <Drawer.Screen name='Inicio' component={HomeScreen} options={{ headerTitle: 'SoyUteísta' }} />
      <Drawer.Screen name='Calendario' component={CalendarScreen} options={{ headerTitle: 'Calendario' }} />
      <Drawer.Screen name='Horario' component={ScheduleTabs} options={{ headerTitle: 'Horario' }} />
      <Drawer.Screen name='Carnet' component={CarnetScreen} options={{ headerTitle: 'Carnet' }} />
      <Drawer.Screen name='Perfil' component={PerfilScreen} options={{ headerTitle: 'Perfil' }} />
      <Drawer.Screen name='Notas' component={GradesScreen} options={{ headerTitle: 'Notas actuales' }} />
      <Drawer.Screen name='Revista' component={RevistaScreen} options={{ headerTitle: 'Revista' }} />
      <Drawer.Screen name='Agenda' component={AgendaInstitucionalScreen} options={{ headerTitle: 'Agenda UTS' }} />
      <Drawer.Screen name='Tutorias' component={TutoriasTabs} options={{ headerTitle: 'Tutorías' }} />
      {/* <Drawer.Screen name='Tutorias' component={TutoriasTemporal} options={{ headerTitle: 'Tutorias' }} /> */}

    </Drawer.Navigator>
  );
}