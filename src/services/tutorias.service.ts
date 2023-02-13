import {
  IBringCourseByTutor,
  IDaysByAsignatura,
  IFranjaByDayAsignatura,
  ITutoriaResp,
  ITutorInfoResp,
} from "@src/models";
import { ICourse, ICreateCita, ITutor } from "@src/screens/crear-cita-tutoria/models";
import { blobToBase64 } from "@src/utilities";
import { GraphManager } from "@src/services";
import { tutoriasAPI } from "@src/api";

export const getTutorPhoto = async (correo_tutor: string): Promise<{ uri: string }> => {
  const userImage: Blob = await GraphManager.getUserPhotoAsync(correo_tutor);
  const answerBase64: any = await blobToBase64(userImage);
  const photo: string[] = answerBase64.split(',');
  const resp = `data:image/png;base64,${photo[1]}`;
  return { uri: resp };
};

export const getInfoTutor = async (id_course: string, day: string, franja: string, id_tutor: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<ITutorInfoResp>(`/buscar_info_tuto.php?sede=${sede}&id_curso=${id_course}&dia=${day}&franja=${franja}&id_tutor=${id_tutor}`);
  return resp;
}

export const getAllCourses = async (sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<ICourse[]>(`load_cursos.php?sede=${sede}`);
  return resp;
}

export const getAllTutoriasByUser = async (id: string) => {
  const resp = await tutoriasAPI.get<ITutoriaResp>(`/listar_tutorias_todas_estudiante.php?documento=${id}`);
  return resp;
}

export const getCourseByTutor = async (id_tutor: string) => {
  const resp = await tutoriasAPI.get<IBringCourseByTutor[]>(`/load_curso_tutor.php?id_tutor=${id_tutor}`);
  return resp;
}

export const getAllTutors = async (franja: string, id_curso: string, day: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<ITutor[]>(`load_tutor.php?&sede=${sede}&franja=${franja}&id_curso=${id_curso}&dia=${day}`);
  return resp;
}

export const getTutorByIdAsignaturaDayFranja = async (id_asignatura: string, dia: string, franja: string) => {
  const resp = await tutoriasAPI.get<ITutorInfoResp[]>(`/buscar_info_tutor.php?id_asignatura=${id_asignatura}&dia=${dia}&franja=${franja}`);
  return resp;
}

export const getDaysByAsignatura = async (id_curso: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<IDaysByAsignatura[]>(`/buscar_dias.php?id_curso=${id_curso}&sede=${sede}`);
  return resp;
}

export const getFranjaByDayAsignatura = async (id_curso: string, day: string, sede: string = "SEDE PRINCIPAL") => {
  const resp = await tutoriasAPI.get<IFranjaByDayAsignatura[]>(`/buscar_hora.php?id_curso=${id_curso}&dia=${day}&sede=${sede}`);
  return resp;
}

export const postInsertTutoria = async (obj: ICreateCita) => {

}