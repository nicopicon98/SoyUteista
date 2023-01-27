import { AppBarComponent } from "@src/components/app-bar"
import { FABGroup } from "@src/components/FAB-group";
import { screens } from "@src/utilities";
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BienestarInstitucionalScreen = () => {
  const navigation = useNavigation<any>();
  const bienestarFABScreen = screens(navigation).slice(1)
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'red'}} />
      <FABGroup screens={bienestarFABScreen} />
    </>
  )
}