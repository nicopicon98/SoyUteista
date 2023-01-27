import { FABGroup } from '@src/components/FAB-group';
import { screens } from '@src/utilities';
import { View, Text, Appearance, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colorScheme = Appearance.getColorScheme();
const { width } = Dimensions.get("window")
export const CrearCitaBienestarScreen = () => {

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
          }}>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 1, 2, 3, 2, 1, 2, 3, 4, 5, 6, 7, 4, 2].map((e, _) => {
              return <Text key={_}>{e}</Text>
            })}
        </View>
      </ScrollView>
      <FABGroup screens={bienestarFABScreen} />
    </View>
  )
}
