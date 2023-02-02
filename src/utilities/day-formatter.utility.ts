export const dayToID = (day: string) : number => {
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

export function idToDay(day: number): string {
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

export const fromDMYSlashtoYMDHyphen = (date: string): string => {
  const dateArr = date.split("/");
  return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
}

export const fromYMDHyphentoDMYSlash = (date: string): string => {
  const dateArr = date.split("-");
  return dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}