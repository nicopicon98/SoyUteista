import { ItemType } from "react-native-dropdown-picker";
import { IDaysByAsignatura } from "@src/models";
import { Capitalize } from "@src/utilities"

interface IParams {
  days: IDaysByAsignatura[];
  customIcon: JSX.Element
}

export const createDaysItemsAdapter =
  ({ days, customIcon }: IParams): ItemType<string>[] => {
    return days.map(e => ({
      label: `${Capitalize(e.dia)}`,
      value: `${e.dia}`,
      icon: () => customIcon
    }));
  }
