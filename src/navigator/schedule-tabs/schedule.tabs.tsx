import { Dimensions, ActivityIndicator, View, StyleSheet, Appearance } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useHorario } from '@src/screens/schedule-day/hooks';
import { AppBarComponent } from '@src/components/app-bar';
import { ScheduleDay } from '@src/screens/schedule-day';
import { colores } from '@src/theme';


const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

export const ScheduleTabs = () => {

  const { isLoading, materias } = useHorario();
  const colorScheme = Appearance.getColorScheme();

  return (
    <>
      <AppBarComponent title='Horario' />
      <View style={{ flex: 1 }}>
        {isLoading
          ? <ActivityIndicator style={styles.loader} color={colores.Pantone_382_C} animating={isLoading} size='large' />
          : <Tab.Navigator
            style={{
              paddingTop: 0
            }}
            sceneContainerStyle={{
              backgroundColor: colorScheme === 'dark' ? 'black' : 'white'
            }}
            screenOptions={() => ({
              tabBarLabelStyle: {
                fontSize: width * 0.04,
                fontWeight: '700',
              },
              tabBarPressColor: colores.Pantone_382_C,
              tabBarIndicatorStyle: {
                backgroundColor: colorScheme === 'dark' ? 'white' : colores.Pantone_382_C
              },
              tabBarStyle: {
                borderTopColor: colores.Cool_Gray_5_C,
                borderTopWidth: 0,
                elevation: 0,
                shadowColor: 'transparent',
                backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
              },
              tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : 'black'
            })}
          >

            <Tab.Screen name="Lun">
              {() => <ScheduleDay materias={materias!.filter(e => e.DIA == 1)} />}
            </Tab.Screen>
            <Tab.Screen name="Mar">
              {() => <ScheduleDay materias={materias!.filter(e => e.DIA == 2)} />}
            </Tab.Screen>
            <Tab.Screen name="Mie">
              {() => <ScheduleDay materias={materias!.filter(e => e.DIA == 3)} />}
            </Tab.Screen>
            <Tab.Screen name="Jue">
              {() => <ScheduleDay materias={materias!.filter(e => e.DIA == 4)} />}
            </Tab.Screen>
            <Tab.Screen name="Vie">
              {() => <ScheduleDay materias={materias!.filter(e => e.DIA == 5)} />}
            </Tab.Screen>
            <Tab.Screen name="Sab">
              {() => <ScheduleDay materias={materias!.filter(e => e.DIA == 6)} />}
            </Tab.Screen>
          </Tab.Navigator>
        }
      </View>
    </>

  )
}


const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});