export interface ITutoriaResp {
  nombre_tutor: string;
  estado: string;
  correo_tutor: string;
  nombre_asignatura: string;
  dia: string;
  franja_nombre: string;
  lugar: string;
  tema: string;
  fecha_solicitud: string;
  remoto: string;
}

export interface IBringCourseByTutor {
  id_asignatura: string;
  curso: string;
}

export interface IDaysByAsignatura {
  dia: string;
}

export interface IFranjaByDayAsignatura {
  id_franja: string;
  nombre_franja: string;
}
