import { useNavigation } from '@react-navigation/native';
import { screens } from "@src/utilities";

export const BienestarInstitucionalScreen = () => {
  const navigation = useNavigation<any>();
  const bienestarFABScreen = screens(navigation).slice(1)
  return (
    <>
      
    </>
  )
}