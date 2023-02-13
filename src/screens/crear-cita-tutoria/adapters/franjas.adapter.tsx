import { ItemType } from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FranjaByDayAsignatura } from '@src/models';
import { numberToWords } from "@src/utilities";
import { colores } from '@src/theme';

interface Params {
  franjas: FranjaByDayAsignatura[];
}

export const createFranjasItemsAdapter =
  ({ franjas}: Params): ItemType<string>[] => {
    return franjas.map(e => {
      console.log(e.nombre_franja.slice(0, 2));
      const iconName = `clock-time-${numberToWords(e.nombre_franja.slice(0, 2))}`;
      return {
        label: `${e.nombre_franja}`,
        value: `${e.id_franja}`,
        icon: () => <Icon name={iconName} color={colores.Pantone_382_C} size={25} />
      }
    });
  }
