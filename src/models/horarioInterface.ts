export interface HorarioInterface {
  result: number;
  data: Resp2;
}

export interface Resp2 {
  ID: number;
  CEDULA: string;
  NOMBRE: string;
  SEDE: string;
  NOMBRE_PROGRAMA: string;
  CORREO_INSTITUCIONAL: string;
  MATERIAS: MateriaInterface[];
}

export interface MateriaInterface {
  CODIGO_MATERIA: string;
  NOMBRE_MATERIA: string;
  GRUPO: string;
  DIA: number;
  HORA_INICIO: string;
  HORA_FINAL: string;
  SALON: string;
  DESCRIPCION: string;
}