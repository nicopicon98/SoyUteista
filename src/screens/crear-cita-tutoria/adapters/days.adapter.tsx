import { ItemType } from "react-native-dropdown-picker";
import { Capitalize } from "@src/utilities"
import { DaysByAsignatura } from "@src/models";

interface Params {
  days: DaysByAsignatura[];
  customIcon: JSX.Element
}

export const createDaysItemsAdapter =
  ({ days, customIcon }: Params): ItemType<string>[] => {
    return days.map(e => ({
      label: `${e.dia}`,
      value: `${e.dia}`,
      icon: () => customIcon
    }));
  }
