import { View, Appearance, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FABGroup } from '@src/components/FAB-group';
import { screens } from '@src/utilities';
import { ScrollView } from 'react-native-gesture-handler';

const colorScheme = Appearance.getColorScheme();
const { width } = Dimensions.get("window")

export const CardBienestar = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const navigation = useNavigation();
  const bienestarFABScreen = screens(navigation).slice(1)

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
