import {
  BringCourseByTutor,
  CoursesAll,
  CreateCitaResp,
  DaysByAsignatura,
  FranjaByDayAsignatura,
  TutoriaResp,
  TutorInfoResp,
  TutorResp
} from "@src/models";
import { CreateCita } from "@src/screens/crear-cita-tutoria/models";
import { FieldValues } from "react-hook-form";
import { tutoriasAPI } from "@src/api";

export const getInfoTutor = async (id_asignatura: string, diaValue: string, franja: string) => {
  try {
    const resp = await tutoriasAPI.get<TutorInfoResp>(`/buscar_info_tutor.php?id_asignatura=${id_asignatura}&dia=${diaValue}&franja=${franja}`);
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

export const postInsertTutoria = async (obj: CreateCita) => {
  try {
    const resp = await tutoriasAPI.post<CreateCitaResp>('/crear_cita.php', obj);
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

export const getAllCourses = async () => {
  const resp = await tutoriasAPI.get<CoursesAll[]>('load_curso.php');
  return resp
}

export const getAllTutoriasByUser = async (id: string) => {
  const resp = await tutoriasAPI.get<TutoriaResp>(`/listar_tutorias_todas_estudiante.php?documento=${id}`);
  return resp
}

export const getCourseByTutor = async (id_tutor: string) => {
  const resp = await tutoriasAPI.get<BringCourseByTutor[]>(`/load_curso_tutor.php?id_tutor=${id_tutor}`);
  return resp
}

export const getAllTutors = async (tipo_listado: string) => {
  const resp = await tutoriasAPI.get<TutorResp[]>(`/load_tutor.php?tipo_listado=${tipo_listado}&sede=SEDE PRINCIPAL`);
  return resp
}

export const getTutorByIdAsignaturaDayFranja = async (id_asignatura: string, dia: string, franja: string) => {
  const resp = await tutoriasAPI.get<TutorInfoResp[]>(`/buscar_info_tutor.php?id_asignatura=${id_asignatura}&dia=${dia}&franja=${franja}`);
  return resp
}

export const getDaysByAsignatura = async (id_asignatura: string) => {
  const resp = await tutoriasAPI.get<DaysByAsignatura[]>(`/buscar_dias.php?id_asignatura=${id_asignatura}`);
  return resp
}

export const getFranjaByDayAsignatura = async (id_asignatura: string, day: string) => {
  const resp = await tutoriasAPI.get<FranjaByDayAsignatura[]>(`/buscar_hora.php?id_asignatura=${id_asignatura}&dia=${day}`);
  return resp
}

export const postInsertCitaTutoria = async (formData: FieldValues) => {
  const resp = await tutoriasAPI.post('/crear_cita.php', formData);
  return resp;
}