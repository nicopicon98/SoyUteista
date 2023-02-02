import { ItemType } from "react-native-dropdown-picker";
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { Capitalize } from "@src/utilities"
import { Professional } from "../models"

interface Params {
  professionals: Professional[];
  customIcon: JSX.Element
}

export const createProfessionalItemsAdapter =
    ({professionals, customIcon}: Params): ItemType<string>[] => {
    return professionals.map(e => ({
      label: `${Capitalize(e.nombre)}`,
      value: `${e.id_usuario}`,
      icon: () => customIcon
    }));
  }
