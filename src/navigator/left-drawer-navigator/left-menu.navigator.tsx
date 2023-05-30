import {AgendaInstitucionalScreen} from '@src/screens/agenda-institucional';
import {CustomDrawerContent} from '@src/components/custom-drawer-content';
import {DirectorioEscolarScreen} from '@src/screens/directorio-escolar';
import {PushNotificationScreen} from '@src/screens/push-notification';
import {ExitoEscolarScreen} from '@src/navigator/exito-escolar-tabs';
import {useCheckBajoRendimiento, useEnabledScreens} from './hooks';
import {ConvocatoriasScreen} from '@src/screens/convocatorias';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Appearance, useWindowDimensions} from 'react-native';
import {DialogBajoRend} from './components/dialog-bajo-rend';
import {SkeletonNews} from '@src/components/skeleton-news';
import {useNavigation} from '@react-navigation/native';
import {RevistaScreen} from '@src/screens/revista';
import {ProfileScreen} from '@src/screens/profile';
import {FABGroup} from '@src/components/FAB-group';
import {CarnetScreen} from '@src/screens/carnet';
import {GradesScreen} from '@src/screens/grades';
import {BienestarTabs} from '../bienestar-tabs';
import {ScheduleTabs} from '../schedule-tabs';
import {TutoriasTabs} from '../tutorias-tabs';
import {TempScreen} from '@src/screens/temp';
import {HomeScreen} from '@src/screens/home';
import {screens} from '@src/utilities';
import {colores} from '@src/theme';
import {View} from 'react-native';

const Drawer = createDrawerNavigator();

export const LeftDrawerNavigator = () => {
  const {width} = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();
  const navigation = useNavigation<any>();
  //students with low performance
  const {dialogIsOpen, hideDialog, showDialog} = useCheckBajoRendimiento();
  //enable screens
  const { isLoading, enabledScreens, enableChecker } = useEnabledScreens();

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          }}>
          <SkeletonNews />
        </View>
      ) : (
        <>
          <DialogBajoRend
            dialogIsOpen={dialogIsOpen}
            showDialog={showDialog}
            hideDialog={hideDialog}
          />
          <FABGroup screens={screens(navigation)} />
          <Drawer.Navigator
            drawerType={width >= 768 ? 'permanent' : 'front'}
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: colores.Pantone_382_C,
              },
              headerTintColor: 'white',
            }}
            drawerContent={props => (
              <CustomDrawerContent
                {...props}
                darkMode={colorScheme}
              />
            )}>
            {enableChecker(enabledScreens, 'Inicio') == 1 ||
            enableChecker(enabledScreens, 'Inicio') == 2 ? (
              <Drawer.Screen name="Inicio" component={HomeScreen} />
            ) : (
              <Drawer.Screen name="Inicio" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'Horario') == 1 ||
            enableChecker(enabledScreens, 'Horario') == 2 ? (
              <Drawer.Screen name="Horario" component={ScheduleTabs} />
            ) : (
              <Drawer.Screen name="Horario" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'Carnet') == 1 ||
            enableChecker(enabledScreens, 'Carnet') == 2 ? (
              <Drawer.Screen name="Carnet" component={CarnetScreen} />
            ) : (
              <Drawer.Screen name="Carnet" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'Perfil') == 1 ||
            enableChecker(enabledScreens, 'Perfil') == 2 ? (
              <Drawer.Screen name="Perfil" component={ProfileScreen} />
            ) : (
              <Drawer.Screen name="Perfil" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'Notas') == 1 ||
            enableChecker(enabledScreens, 'Notas') == 2 ? (
              <Drawer.Screen name="Notas" component={GradesScreen} />
            ) : (
              <Drawer.Screen name="Notas" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'Revista') == 1 ||
            enableChecker(enabledScreens, 'Revista') == 2 ? (
              <Drawer.Screen name="Revista" component={RevistaScreen} />
            ) : (
              <Drawer.Screen name="Revista" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'Agenda') == 1 ||
            enableChecker(enabledScreens, 'Agenda') == 2 ? (
              <Drawer.Screen
                name="Agenda"
                component={AgendaInstitucionalScreen}
              />
            ) : (
              <Drawer.Screen name="Agenda" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'ExitoEscolar') == 1 ||
            enableChecker(enabledScreens, 'ExitoEscolar') == 2 ? (
              <Drawer.Screen
                name="ExitoEscolar"
                component={ExitoEscolarScreen}
              />
            ) : (
              <Drawer.Screen name="ExitoEscolar" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'DirectorioInstitucional') == 1 ||
            enableChecker(enabledScreens, 'DirectorioInstitucional') == 2 ? (
              <Drawer.Screen
                name="DirectorioInstitucional"
                component={DirectorioEscolarScreen}
              />
            ) : (
              <Drawer.Screen
                name="DirectorioInstitucional"
                component={TempScreen}
              />
            )}
            {enableChecker(enabledScreens, 'Convocatorias') == 1 ||
            enableChecker(enabledScreens, 'Convocatorias') == 2 ? (
              <Drawer.Screen
                name="Convocatorias"
                component={ConvocatoriasScreen}
              />
            ) : (
              <Drawer.Screen name="Convocatorias" component={TempScreen} />
            )}
            {/* {enableChecker(enabledScreens, 'Bienestar') == 1 ||
            enableChecker(enabledScreens, 'Bienestar') == 2 ? (
              <Drawer.Screen name="Bienestar" component={BienestarTabs} />
            ) : (
              <Drawer.Screen name="Bienestar" component={TempScreen} />
            )} */}
            <Drawer.Screen name='Bienestar' component={BienestarTabs} />
            {enableChecker(enabledScreens, 'Tutorias') == 1 ||
            enableChecker(enabledScreens, 'Tutorias') == 2 ? (
              <Drawer.Screen name="Tutorias" component={TutoriasTabs} />
            ) : (
              <Drawer.Screen name="Tutorias" component={TempScreen} />
            )}
            {enableChecker(enabledScreens, 'PushNotification') == 1 ||
            enableChecker(enabledScreens, 'PushNotification') == 2 ? (
              <Drawer.Screen
                name="PushNotification"
                component={PushNotificationScreen}
              />
            ) : (
              <Drawer.Screen name="PushNotification" component={TempScreen} />
            )}
          </Drawer.Navigator>
        </>
      )}
    </>
  );
};
