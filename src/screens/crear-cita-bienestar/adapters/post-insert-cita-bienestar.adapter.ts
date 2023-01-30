interface Params {
  id_horario: string,
  userStudentEmail: string,
  userStudentCelphone: string;
}

export const insertCitaBienestarAdapter =
  ({ id_horario, userStudentEmail, userStudentCelphone }: Params) => {
    return {
      id_horario,
      student_celphone: userStudentCelphone,
      tomado_por: userStudentEmail,
    }
  }