import { IMateriaHorario } from "./";

export interface IHorarioResp {
  result: number;
  data: IUserData;
}

export interface IUserData {
  ID: number;
  CEDULA: string;
  NOMBRE: string;
  SEDE: string;
  NOMBRE_PROGRAMA: string;
  CORREO_INSTITUCIONAL: string;
  MATERIAS: IMateriaHorario[];
}

