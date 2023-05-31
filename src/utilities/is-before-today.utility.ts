import moment from 'moment';

export const isBeforeToday = (dateStr: string): boolean => {
  const date = moment(dateStr);
  const today = moment().startOf('day');
  if (date.isSame(today, 'day')) {
    return true;
  }

  return date.isBefore(today);
};
