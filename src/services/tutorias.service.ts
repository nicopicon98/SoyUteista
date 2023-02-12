import {
  BringCourseByTutor,
  CreateCitaResp,
  DaysByAsignatura,
  FranjaByDayAsignatura,
  TutoriaResp,
  TutorInfoResp,
} from "@src/models";
import { Course, CreateCita, ITutor } from "@src/screens/crear-cita-tutoria/models";
import { FieldValues } from "react-hook-form";
import { tutoriasAPI } from "@src/api";

export const getInfoTutor = async (id_curso: string, day: string, franja:string, id_tutor: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<TutorInfoResp>(`/buscar_info_tutor.php?sede=${sede}&id_curso=${id_curso}&dia=${day}&franja=${franja}&id_tutor=${id_tutor}`);
  return resp
}

export const getAllCourses = async (sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<Course[]>(`load_cursos.php?sede=${sede}`);
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

export const getAllTutors = async (franja: string, id_curso: string, day: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<ITutor[]>(`load_tutor.php?&sede=${sede}&franja=${franja}&id_curso=${id_curso}&dia=${day}`);
  return resp
}

export const getTutorByIdAsignaturaDayFranja = async (id_asignatura: string, dia: string, franja: string) => {
  const resp = await tutoriasAPI.get<TutorInfoResp[]>(`/buscar_info_tutor.php?id_asignatura=${id_asignatura}&dia=${dia}&franja=${franja}`);
  return resp
}

export const getDaysByAsignatura = async (id_curso: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<DaysByAsignatura[]>(`/buscar_dias.php?id_curso=${id_curso}&sede=${sede}`);
  return resp
}

export const getFranjaByDayAsignatura = async (id_curso: string, day: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<FranjaByDayAsignatura[]>(`/buscar_hora.php?id_curso=${id_curso}&dia=${day}&sede=${sede}`);
  return resp
}

export const postInsertCitaTutoria = async (formData: FieldValues) => {
  const resp = await tutoriasAPI.post('/crear_cita.php', formData);
  return resp;
}

export const postInsertTutoria = async (obj: CreateCita) => {
  const resp = await tutoriasAPI.post<CreateCitaResp>('/crear_cita.php', obj);
  return resp
}