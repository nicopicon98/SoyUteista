import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ItemType } from "react-native-dropdown-picker";
import { IFranjaByDayAsignatura } from "@src/models";
import { numberToWords } from "@src/utilities";
import { colores } from '@src/theme';

interface IParams {
  franjas: IFranjaByDayAsignatura[];
}

export const createFranjasItemsAdapter =
  ({ franjas}: IParams): ItemType<string>[] => {
    return franjas.map(e => {
      const iconName = `clock-time-${numberToWords(e.nombre_franja.slice(0, 2))}`;
      return {
        label: `${e.nombre_franja}`,
        value: `${e.id_franja}`,
        icon: () => <Icon name={iconName} color={colores.Pantone_382_C} size={25} />
      }
    });
  }
