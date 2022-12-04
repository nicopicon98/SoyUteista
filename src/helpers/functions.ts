export const replaceNull = (someObj: any, replaceValue = "") => {
  const replacer = (key: any, value: any) =>
    String(value) === "null" || String(value) === "undefined" ? replaceValue : value;
  return JSON.parse(JSON.stringify(someObj, replacer));
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

export function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);
  return previous;
}

export function dayOfTheWeek(day: string) {
  switch (day) {
    case 'LUNES':
      return 0;
    case 'MARTES':
      return 1
    case 'MIERCOLES':
      return 2;
    case 'JUEVES':
      return 3
    case 'VIERNES':
      return 4;
    case 'SABADO':
      return 5;
    default:
      return 0;
  }
}

export function inverseDayOfTheWeek(day: number) {
  switch (day) {
    case 0:
      return 'LUNES';
    case 1:
      return 'MARTES';
    case 2:
      return 'MIERCOLES';
    case 3:
      return 'JUEVES'
    case 4:
      return 'VIERNES';
    case 5:
      return 'SABADO';
    default:
      return '';
  }
}
