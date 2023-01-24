export const dayToID = (day: string) => {
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

export function idToDay(day: number) {
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