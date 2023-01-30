export const isBeforeToday = (date: Date) : boolean => {
  const today = new Date();
  return date < today;
}