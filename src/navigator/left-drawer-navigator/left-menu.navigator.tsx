import { AgendaInstitucionalScreen } from '@src/screens/agenda-institucional';
import { CustomDrawerContent } from '@src/components/custom-drawer-content';
import { DirectorioEscolarScreen } from '@src/screens/directorio-escolar';
import { ConvocatoriasScreen } from '@src/screens/convocatorias';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ExitoEscolarScreen } from '@src/screens/exito-escolar';
import { Appearance, useWindowDimensions } from 'react-native';
import { ModalBajoRend } from './components/modal-bajo-rend';
import { RevistaScreen } from '@src/screens/revista';
import { ProfileScreen } from '@src/screens/profile';
import { CarnetScreen } from '@src/screens/carnet';
import { GradesScreen } from '@src/screens/grades';
import { useCheckBajoRendimiento } from './hooks';
import { BienestarTabs } from '../bienestar-tabs';
import { HomeScreen } from '@src/screens/home';
import { ScheduleTabs } from '../schedule.tabs';
import { TutoriasTabs } from '../tutorias.tabs';
import { AuthContext } from '@src/context';
import { colores } from '@src/theme';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

export const LeftDrawerNavigator = () => {
  const { width, height } = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();
  const { authState: { user } } = useContext(AuthContext);

  useCheckBajoRendimiento(user!); //dispatch rx-js subscriber to show up modal

  return (
    <>
      <ModalBajoRend />
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
            height={user!.userResult !== 1 ? height * 0.62 : height}
            userPhotoError={user!.userPhotoError}
            userResult={user!.userResult}
            darkMode={colorScheme}
            userFranDesc={user!.userMoreInfo.C_FRAN_DESCRIPCION}
          />
        )}>
        <Drawer.Screen name='Inicio' component={HomeScreen} />
        <Drawer.Screen name='Horario' component={ScheduleTabs} />
        <Drawer.Screen name='Carnet' component={CarnetScreen} />
        <Drawer.Screen name='Perfil' component={ProfileScreen} />
        <Drawer.Screen name='Notas' component={GradesScreen} />
        <Drawer.Screen name='Revista' component={RevistaScreen} />
        <Drawer.Screen name='Agenda' component={AgendaInstitucionalScreen} />
        <Drawer.Screen name='ExitoEscolar' component={ExitoEscolarScreen} />
        <Drawer.Screen name='DirectorioEscolar' component={DirectorioEscolarScreen} />
        <Drawer.Screen name='Convocatorias' component={ConvocatoriasScreen} />
        {/* <Drawer.Screen name='Tutorias' component={TutoriasTemporal} options={{ headerTitle: 'Tutorias' }} /> */}
        <Drawer.Screen name="Bienestar" component={BienestarTabs} />
        <Drawer.Screen name='Tutorias' component={TutoriasTabs} />
      </Drawer.Navigator>
    </>
  );
}