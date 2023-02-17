import { View, Dimensions, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { colores } from '@src/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("screen");
export const SplashTemp = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('@src/resources/Images/maintenance_2.jpg')}
          style={{ width: width, height: width * 0.8 }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: width * 0.04 }}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontWeight: '400', color: colores.Pantone_382_C, fontSize: width * 0.085 }}>En mantenimiento!</Text>
          </View>
          <View style={{marginTop: width*0.025}}>
            <Text style={{ textAlign: 'center', color: colores.Cool_Gray_5_C, fontSize: width * 0.04 }}>Estamos en mantenimiento para ofrecerte una mejor experiencia. Agradecemos tu paciencia mientras trabajamos en ello.</Text>
          </View>
        </View>
      </View>
    </View>
  )
}