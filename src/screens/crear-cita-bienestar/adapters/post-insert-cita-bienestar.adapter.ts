interface IParams {
  id_horario: string,
  userStudentEmail: string,
  userStudentCelphone: string;
}

export const insertCitaBienestarAdapter =
  ({ id_horario, userStudentEmail, userStudentCelphone }: IParams) => {
    return {
      id_horario,
      student_celphone: userStudentCelphone,
      tomado_por: userStudentEmail,
    }
  }