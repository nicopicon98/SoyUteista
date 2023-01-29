import { View, ScrollView, Appearance, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FABGroup } from '@src/components/FAB-group';
import { screens } from '@src/utilities';

const colorScheme = Appearance.getColorScheme();
const { width } = Dimensions.get("window")

export const CardBienestar = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const navigation = useNavigation();
  const bienestarFABScreen = screens(navigation).slice(1)

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        }}>
        <View style={{
          alignItems: 'center',
          marginHorizontal: width * 0.037,
          marginTop: width*0.03
        }}>
          {children}
        </View>
      </ScrollView>
      {/* <FABGroup screens={bienestarFABScreen} /> */}
    </View>
  )
}
