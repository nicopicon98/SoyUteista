import { View, Appearance, Dimensions, Platform } from 'react-native';

const colorScheme = Appearance.getColorScheme();
const { width } = Dimensions.get("window")

export const CardTutorias = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  return (
    <View style={{
      alignItems: 'center',
      marginHorizontal: width * 0.037,
      marginTop: Platform.OS !== 'ios' ? width * 0.04 : width*-0.08,
      paddingTop: 0,
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      flex: 1,
    }}>
      {children}
    </View>
  )
}
