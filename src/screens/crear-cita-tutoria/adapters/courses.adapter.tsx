import { ItemType } from "react-native-dropdown-picker";
import { Capitalize } from "@src/utilities"
import { ICourse } from "../models"

interface Params {
  courses: ICourse[];
  customIcon: JSX.Element
}

export const createCoursesItemsAdapter =
  ({ courses, customIcon }: Params): ItemType<string>[] => {
    const coursesFilteredNotNull = courses.filter(e => !checkCourseNull(e));
    return coursesFilteredNotNull.map(e => {
      return {
        label: e.nombre_curso,
        value: `${e.id_curso}`,
        icon: () => customIcon
      }
    });
  }

const checkCourseNull = (course: ICourse) => {
  return +course.id_curso === 0 || course.nombre_curso === null
}