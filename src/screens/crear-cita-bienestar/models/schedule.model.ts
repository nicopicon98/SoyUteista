export interface IBienestarProfessionalSchedule {
  date: string;
  franjas: IBienestarProfessionalFranjaSchedule[]
}

export interface IBienestarProfessionalFranjaSchedule {
  id_horario: string;
  nombre: string;
}