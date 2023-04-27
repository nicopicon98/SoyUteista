export const isTodayOrBefore = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  const date = new Date(dateString);
  return date <= today;
};
