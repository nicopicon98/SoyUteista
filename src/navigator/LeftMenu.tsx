import React, { useContext } from 'react';
import { Appearance, useWindowDimensions } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';


import { CustomDrawerContent } from '../components/custom-drawer-content/custom-drawer-content.component';
import { colores } from '../theme/appTheme';
import { ScheduleTabs } from './ScheduleTabs';
import { TutoriasTabs } from './TutoriasTabs';
import { AuthContext } from '../context/auth.context';

import { HomeScreen } from '../screens/home/home.screen';
import { CarnetScreen } from '../screens/carnet/carnet.screen';
import { PerfilScreen } from '../screens/profile/profile.screen';
import { GradesScreen } from '../screens/grades/grades.screen';
import { RevistaScreen } from '../screens/revista/revista.screen';
import { AgendaInstitucionalScreen } from '../screens/agenda-institucional/agenda-institucional.screen';
import { TutoriasTemporal } from '../screens/citas-tutorias/TutoriasTemporal';
import ExitoEscolarScreen from '../screens/exito-escolar/exito-escolar.screen';
import BienestarInstitucionalScreen from '../screens/bienestar-institucional/bienestar-institucional.screen';
import DirectorioEscolarScreen from '../screens/directorio-escolar/directorio-escolar.screen';
import ConvocatoriasScreen from '../screens/ConvocatoriasScreen';

const Drawer = createDrawerNavigator();

export const LeftMenu = () => {

  const { width, height } = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();

  const { authState, authState: { user } } = useContext(AuthContext)

  return (
    <Drawer.Navigator
      drawerType={(width >= 768) ? 'permanent' : 'front'}
      screenOptions={{
        headerShown: false,
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
          height={user!.userResult !== 1 ? height * 0.62 : height }
          userPhotoError={user!.userPhotoError}
          userResult={user!.userResult}
          darkMode={colorScheme}
          userFranDesc={user!.userMoreInfo.C_FRAN_DESCRIPCION}
        />
      )}>

      <Drawer.Screen name='Inicio' component={HomeScreen} options={{ headerTitle: 'SoyUteísta' }} />
      <Drawer.Screen name='Horario' component={ScheduleTabs} options={{ headerTitle: 'Horario' }} />
      <Drawer.Screen name='Carnet' component={CarnetScreen} options={{ headerTitle: 'Carnet' }} />
      <Drawer.Screen name='Perfil' component={PerfilScreen} options={{ headerTitle: 'Perfil' }} />
      <Drawer.Screen name='Notas' component={GradesScreen} options={{ headerTitle: 'Notas actuales' }} />
      <Drawer.Screen name='Revista' component={RevistaScreen} options={{ headerTitle: 'Revista' }} />
      <Drawer.Screen name='Agenda' component={AgendaInstitucionalScreen} options={{ headerTitle: 'Agenda UTS' }} />
      <Drawer.Screen name='Tutorias' component={TutoriasTabs} options={{ headerTitle: 'Tutorías' }} />
      <Drawer.Screen name='ExitoEscolar' component={ExitoEscolarScreen} options={{ headerTitle: 'Exito Escolar' }} />
      <Drawer.Screen name='DirectorioEscolar' component={DirectorioEscolarScreen} options={{ headerTitle: 'Directorio Escolar' }} />
      <Drawer.Screen name='BienestarInstitucional' component={BienestarInstitucionalScreen} options={{ headerTitle: 'Bienestar Institucional' }} />
      <Drawer.Screen name='Convocatorias' component={ConvocatoriasScreen} options={{ headerTitle: 'Convocatorias' }} />
      {/* <Drawer.Screen name='Tutorias' component={TutoriasTemporal} options={{ headerTitle: 'Tutorias' }} /> */}

    </Drawer.Navigator>
  );
}