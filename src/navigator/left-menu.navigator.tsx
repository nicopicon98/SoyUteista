import { BienestarInstitucionalScreen } from '@src/screens/bienestar-institucional';
import { AgendaInstitucionalScreen } from '@src/screens/agenda-institucional';
import { CustomDrawerContent } from '@src/components/custom-drawer-content';
import { DirectorioEscolarScreen } from '@src/screens/directorio-escolar';
import { ConvocatoriasScreen } from '@src/screens/convocatorias';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ExitoEscolarScreen } from '@src/screens/exito-escolar';
import { Appearance, useWindowDimensions } from 'react-native';
import { RevistaScreen } from '@src/screens/revista';
import { ProfileScreen } from '@src/screens/profile';
import { CarnetScreen } from '@src/screens/carnet';
import { GradesScreen } from '@src/screens/grades';
import { HomeScreen } from '@src/screens/home';
import { ScheduleTabs } from './schedule.tabs';
import { TutoriasTabs } from './tutorias.tabs';
import { AuthContext } from '@src/context';
import { colores } from '@src/theme';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

export const LeftMenuNavigator = () => {
  const { width, height } = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();
  const { authState: { user } } = useContext(AuthContext)

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
      <Drawer.Screen name='Perfil' component={ProfileScreen} options={{ headerTitle: 'Perfil' }} />
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