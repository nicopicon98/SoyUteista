import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppBarComponent } from '@src/components/app-bar';
import { Appearance, Dimensions, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';
import { useVideosPodcast } from './hooks';
import { colores } from '@src/theme';
import { CardPodcast, CardVideo } from './components';

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

export const ExitoEscolarScreen = () => {
  const { isLoading, podcast, videos } = useVideosPodcast()
  const colorScheme = Appearance.getColorScheme();
  return (
    <>
      <AppBarComponent title="Exito Escolar" />
      <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
        {isLoading
          ? <ActivityIndicator style={styles.loader} color={colorScheme === 'dark' ? 'white' : colores.Pantone_382_C} animating={isLoading} size='large' />
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
            <Tab.Screen name="Videos">
              {() => <CardVideo videos={videos.data} />}
            </Tab.Screen>
            <Tab.Screen name="Podcasts">
              {() => <CardPodcast podcast={podcast.data} />}
            </Tab.Screen>
          </Tab.Navigator>
        }
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});