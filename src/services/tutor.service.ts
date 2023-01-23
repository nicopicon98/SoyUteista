import { tutoriasAPI } from "../api";
import { CreateCitaInterface, RespCreateCitaInterface } from "../models/CreateCitaInterface";
import { TutoriasInfoTutorInterface } from "../models/TutoriasInfoTutorInterface";

export const getInfoTutor = async (id_asignatura: string, diaValue: string, franja: string) => {
  try {
    const resp = await tutoriasAPI.get<TutoriasInfoTutorInterface>(`/buscar_info_tutor.php?id_asignatura=${id_asignatura}&dia=${diaValue}&franja=${franja}`);
    return resp
  } catch (error) {
    console.log(error)
    return {
      data: {
        error: "Ocurrio un error al traer la informacion del tutor, comuniquese con su administrador",
        result: 500
      }
    }
  }
}

export const postInsertTutoria = async (obj: CreateCitaInterface) => {
  try {
    const resp = await tutoriasAPI.post<RespCreateCitaInterface>('/crear_cita.php', obj);
    return resp
  } catch (error) {
    console.log(error)
    return {
      data: {
        error: "Ocurrio un error en la insercion de su tutoria, comuniquese con el administrador",
        result: 500
      }
    }
  }
}
