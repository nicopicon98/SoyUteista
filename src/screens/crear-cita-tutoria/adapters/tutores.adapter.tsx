import { ItemType } from "react-native-dropdown-picker";
import { ITutor } from "../models";

interface Params {
  tutores: ITutor[];
  customIcon: JSX.Element
}

export const createTutorItemsAdapter =
  ({ tutores, customIcon }: Params): ItemType<string>[] => {
    return tutores.map(e => ({
      label: `${e.nombre}`,
      value: `${e.id_tutor}`,
      icon: () => customIcon
    }));
  }
