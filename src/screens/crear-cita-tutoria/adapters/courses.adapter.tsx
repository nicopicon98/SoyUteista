import { ItemType } from "react-native-dropdown-picker";
import { Capitalize } from "@src/utilities"
import { Course } from "../models"

interface Params {
  courses: Course[];
  customIcon: JSX.Element
}

export const createCoursesItemsAdapter =
  ({ courses, customIcon }: Params): ItemType<string>[] => {
    return courses.map(e => ({
      label: `${e.nombre_curso}`,
      value: `${e.id_curso}`,
      icon: () => customIcon
    }));
  }
