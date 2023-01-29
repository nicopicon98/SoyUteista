import { BottomNavigation, DefaultTheme } from 'react-native-paper';
import { useBienestarTabs } from './hooks/useBienestarTabs.hooks';
import { View, Text, TextStyle, StyleProp } from 'react-native';
import { AppBarComponent } from "@src/components/app-bar";
import { colores } from "@src/theme";

export const BienestarTabs = () => {

  const { index, renderScene, routes, setIndex, setBadgeVisible } = useBienestarTabs(2);

  const labelStyle = (focused: boolean): StyleProp<TextStyle> => {
    return {
      color: focused ? colores.Pantone_382_C : colores.Cool_Gray_5_C,
      fontWeight: focused ? 'bold' : 'normal'
    }
  }

  return (
    <>
      <AppBarComponent title='Bienestar' />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        inactiveColor="black"
        activeColor={colores.Pantone_382_C}
        renderScene={renderScene}
        shifting={true}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            secondaryContainer: colores.GreenLightOpacity, // Use transparent to disable the little highlighting oval
          },
        }}
        sceneAnimationEnabled={true}
        renderLabel={({ route, focused }) => {
          return (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: -4
            }}>
              <Text style={labelStyle(focused)}>{route.title}</Text>
            </View>
          )
        }}
        compact={true}
        onTabPress={({ route }) => route.key === 'todas' && setBadgeVisible(false)}
      />

    </>
  );
}