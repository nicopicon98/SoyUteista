import { ItemType } from "react-native-dropdown-picker";
import { IBienestarProfessional } from "../models"
import { Capitalize } from "@src/utilities"

interface IParams {
  professionals: IBienestarProfessional[];
  customIcon: JSX.Element
}

export const createProfessionalItemsAdapter =
    ({professionals, customIcon}: IParams): ItemType<string>[] => {
    return professionals.map(e => ({
      label: `${Capitalize(e.nombre)}`,
      value: `${e.id_usuario}`,
      icon: () => customIcon
    }));
  }
