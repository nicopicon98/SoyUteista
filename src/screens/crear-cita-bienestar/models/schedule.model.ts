export interface Schedule {
  date: string;
  franjas: Franja[]
}

export interface Franja {
  id_horario: string;
  nombre: string;
}