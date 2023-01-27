import { useBienestarTabs } from './hooks/useBienestarTabs.hooks';
import { View, Text, TextStyle, StyleProp } from 'react-native';
import { AppBarComponent } from "@src/components/app-bar";
import { BottomNavigation } from 'react-native-paper';
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
        renderScene={renderScene}
        shifting={true}
        sceneAnimationEnabled={true}
        activeColor={colores.Pantone_382_C}
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
        onTabPress={({route}) => route.key === 'todas' && setBadgeVisible(false)}
        // renderIcon={({ route, focused }) => {
        //   // return {route.focusedIcon}
        //   return (
        //     <Icon />

        //   )
        // }}
      />

    </>
  );
}