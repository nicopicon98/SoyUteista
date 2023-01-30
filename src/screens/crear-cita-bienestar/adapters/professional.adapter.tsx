import { Professional } from "../models/professional.model"
import Icon from 'react-native-vector-icons/Ionicons';
import { Capitalize } from "@src/utilities"
import { ItemType } from "react-native-dropdown-picker";

export const createProfessionalItemsAdapter =
  (professionals: Professional[]): ItemType<string>[] => {
    return professionals.map(e => ({
      label: `${Capitalize(e.nombre)}`,
      value: e.id_usuario,
      icon: () => <Icon name="person-outline" size={25} />
    }));
  }