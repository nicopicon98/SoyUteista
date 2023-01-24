import { MateriaInterface } from "./";

export interface HorarioResp {
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

