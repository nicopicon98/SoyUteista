import { numberToWords } from "@src/utilities/number-to-words.utility";
import { ItemType } from "react-native-dropdown-picker";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { Schedule } from "../models"

interface IParams {
  schedule: Schedule;
}

export function createScheduleItemAdapter (
      { schedule, }: IParams): ItemType<string>[]{ 

  return schedule.franjas.map((e) => {
    const iconName = `clock-time-${numberToWords(e.nombre.slice(0,2))}`;
    return {
      label: e.nombre,
      value: e.id_horario,
      icon: () => <Icon name={iconName} size={25}/>
    }
  })
}

