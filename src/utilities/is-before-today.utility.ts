import moment from "moment";


export const isBeforeToday = (dateStr: string): boolean => {
  const date = moment(dateStr).format()
  const today = moment().startOf('day').format()
  return date < today;
}