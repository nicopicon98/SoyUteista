import { dayToID } from "./day-formatter.utility";
import moment from "moment";

export const isDayOfTheWeek = (date: string = "", dayWeek: string) => {
  const idDayWeek = dayToID(dayWeek)
  const idGivenDateDayWeek = moment(date).day()
  return idDayWeek === idGivenDateDayWeek
}
