import { AgendaInstitucionalScreen } from '@src/screens/agenda-institucional';
import { CustomDrawerContent } from '@src/components/custom-drawer-content';
import { DirectorioEscolarScreen } from '@src/screens/directorio-escolar';
import { PushNotificationScreen } from '@src/screens/push-notification';
import { ExitoEscolarScreen } from '@src/navigator/exito-escolar-tabs';
import { ConvocatoriasScreen } from '@src/screens/convocatorias';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appearance, useWindowDimensions } from 'react-native';
import { ModalBajoRend } from './components/modal-bajo-rend';
import { SkeletonNews } from '@src/components/skeleton-news';
import { EnabledScreensService } from '@src/services';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { RevistaScreen } from '@src/screens/revista';
import { ProfileScreen } from '@src/screens/profile';
import { FABGroup } from '@src/components/FAB-group';
import { CarnetScreen } from '@src/screens/carnet';
import { GradesScreen } from '@src/screens/grades';
import { IEnable, IRespEnable } from '@src/screens/temp/models';
import { useCheckBajoRendimiento } from './hooks';
import { BienestarTabs } from '../bienestar-tabs';
import { ScheduleTabs } from '../schedule-tabs';
import { TutoriasTabs } from '../tutorias-tabs';
import { AuthContext } from '@src/context/auth';
import { TempScreen } from '@src/screens/temp';
import { HomeScreen } from '@src/screens/home';
import { getDataMock } from './data/mockData';
import { screens } from '@src/utilities';
import { colores } from '@src/theme';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

export const LeftDrawerNavigator = () => {
  const { width, height } = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();
  const { authState: { user } } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [getData, setGetData] = useState<IEnable[]>(getDataMock);

  const enableChecker = (obj: IEnable[], screenStr: string) => {
    const exist = obj.find(e => e.nombre === screenStr);
    if (exist) {
      const availability = obj.filter(e => e.nombre === screenStr)
      return availability[0].habilitado
    }
    return 2 //doesn't exist
  }

  const fetchEnabledScreens = async () => {
    const resp = await EnabledScreensService.getAll(user!.userEmail, );
    setGetData(resp.data);
    setIsLoading(false);
  }

  const navigation = useNavigation<any>();
  useCheckBajoRendimiento(user!); //dispatch rx-js subscriber to show up modal
  useEffect(() => {
    fetchEnabledScreens();
  }, [])

  return (
    <>
      {isLoading
        ? <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
          <SkeletonNews />
        </View>
        : <>
          <ModalBajoRend />
          <FABGroup screens={screens(navigation)} />
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
                userResult={user!.userResult}
                darkMode={colorScheme}
                userFranDesc={user!.userMoreInfo.C_FRAN_DESCRIPCION}
              />
            )}>
            {
              enableChecker(getData, 'Inicio') == 1 || enableChecker(getData, 'Inicio') == 2
                ? <Drawer.Screen name='Inicio' component={HomeScreen} />
                : <Drawer.Screen name='Inicio' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Horario') == 1 || enableChecker(getData, 'Horario') == 2
                ? <Drawer.Screen name='Horario' component={ScheduleTabs} />
                : <Drawer.Screen name='Horario' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Carnet') == 1 || enableChecker(getData, 'Carnet') == 2
                ? <Drawer.Screen name='Carnet' component={CarnetScreen} />
                : <Drawer.Screen name='Carnet' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Perfil') == 1 || enableChecker(getData, 'Perfil') == 2
                ? <Drawer.Screen name='Perfil' component={ProfileScreen} />
                : <Drawer.Screen name='Perfil' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Notas') == 1 || enableChecker(getData, 'Notas') == 2
                ? <Drawer.Screen name='Notas' component={GradesScreen} />
                : <Drawer.Screen name='Notas' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Revista') == 1 || enableChecker(getData, 'Revista') == 2
                ? <Drawer.Screen name='Revista' component={RevistaScreen} />
                : <Drawer.Screen name='Revista' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Agenda') == 1 || enableChecker(getData, 'Agenda') == 2
                ? <Drawer.Screen name='Agenda' component={AgendaInstitucionalScreen} />
                : <Drawer.Screen name='Agenda' component={TempScreen} />
            }
            {
              enableChecker(getData, 'ExitoEscolar') == 1 || enableChecker(getData, 'ExitoEscolar') == 2
                ? <Drawer.Screen name='ExitoEscolar' component={ExitoEscolarScreen} />
                : <Drawer.Screen name='ExitoEscolar' component={TempScreen} />
            }
            {
              enableChecker(getData, 'DirectorioInstitucional') == 1 || enableChecker(getData, 'DirectorioInstitucional') == 2
                ? <Drawer.Screen name='DirectorioInstitucional' component={DirectorioEscolarScreen} />
                : <Drawer.Screen name='DirectorioInstitucional' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Convocatorias') == 1 || enableChecker(getData, 'Convocatorias') == 2
                ? <Drawer.Screen name='Convocatorias' component={ConvocatoriasScreen} />
                : <Drawer.Screen name='Convocatorias' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Bienestar') == 1 || enableChecker(getData, 'Bienestar') == 2
                ? <Drawer.Screen name='Bienestar' component={BienestarTabs} />
                : <Drawer.Screen name='Bienestar' component={TempScreen} />
            }
            {
              enableChecker(getData, 'Tutorias') == 1 || enableChecker(getData, 'Tutorias') == 2
                ? <Drawer.Screen name='Tutorias' component={TutoriasTabs} />
                : <Drawer.Screen name='Tutorias' component={TempScreen} />
            }
            {
              enableChecker(getData, 'PushNotification') == 1 || enableChecker(getData, 'PushNotification') == 2
                ? <Drawer.Screen name='PushNotification' component={PushNotificationScreen} />
                : <Drawer.Screen name='PushNotification' component={TempScreen} />
            }
          </Drawer.Navigator>
        </>
      }
    </>
  );
}