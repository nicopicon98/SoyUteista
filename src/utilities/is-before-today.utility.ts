import moment from 'moment';

export const isBeforeToday = (dateStr: string): boolean => {
  const date = moment(dateStr);
  const today = moment().startOf('day');
  console.log(date.isSame(today, 'day'), date)
  if (date.isSame(today, 'day')) {
    console.log("entro", dateStr)
    return true;
  }

  return date.isBefore(today);
};
