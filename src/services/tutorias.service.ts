import {
  IDaysByAsignatura,
  IFranjaByDayAsignatura,
  ITutoriaResp,
  ITutorInfoResp,
} from '@src/models';
import {
  ICourse,
  ICreateCita,
  ITutor,
} from '@src/screens/crear-cita-tutoria/models';
import {blobToBase64} from '@src/utilities';
import {GraphManager} from '@src/services';
import {tutoriasAPI} from '@src/api';
import {AxiosResponse} from 'axios';

/**
 * Represents a class that provides access to tutoring services.
 */
export class Tutorias {
  /**
   * Retrieves all courses from the API.
   * @async
   * @public
   * @static
   * @param sede The campus to search for courses.
   * @returns A Promise that resolves to an array of ICourse objects.
   */
  public static getAllCourses = async (
    sede: string,
    modeTutorial: string,
  ): Promise<ICourse[]> => {
    const resp = await tutoriasAPI.get<ICourse[]>(
      `buscar_cursos.php?sede=${sede}&modalidad=${modeTutorial}`,
    );
    return resp.data;
  };

  /**
   * Retrieves the days when a specific course is available.
   * @async
   * @public
   * @static
   * @param id_curso The ID of the course to search for.
   * @param sede The campus where the course is offered.
   * @returns A Promise that resolves to an array of IDaysByAsignatura objects.
   */
  public static getDaysByAsignatura = async (
    id_curso: string,
    sede: string,
    modeTutorial: string,
  ): Promise<IDaysByAsignatura[]> => {
    const resp = await tutoriasAPI.get<IDaysByAsignatura[]>(
      `/buscar_dias.php?id_curso=${id_curso}&sede=${sede}&modalidad=${modeTutorial}`,
    );
    return resp.data;
  };

  /**
   * Retrieves the available time slots for a specific course and day.
   * @async
   * @public
   * @static
   * @param id_curso The ID of the course to search for.
   * @param day The day to search for time slots.
   * @param sede The campus where the course is offered.
   * @returns A Promise that resolves to an array of IFranjaByDayAsignatura objects.
   */
  public static getFranjaByDayAsignatura = async (
    id_curso: string,
    day: string,
    sede: string,
    modeTutorial: string,
  ): Promise<IFranjaByDayAsignatura[]> => {
    const resp = await tutoriasAPI.get<IFranjaByDayAsignatura[]>(
      `/buscar_hora.php?id_curso=${id_curso}&dia=${day}&sede=${sede}&modalidad=${modeTutorial}`,
    );
    return resp.data;
  };

  /**
   * Retrieves all tutors available for a specific course, day, and time slot.
   * @async
   * @public
   * @static
   * @param id_curso The ID of the course to search for.
   * @param day The day to search for tutors.
   * @param franja The time slot to search for tutors.
   * @param sede The campus where the course is offered.
   * @returns A Promise that resolves to an array of ITutor objects.
   */
  public static getAllTutors = async (
    id_curso: string,
    day: string,
    franja: string,
    sede: string,
    modeTutorial: string
  ): Promise<ITutor[]> => {
    const resp = await tutoriasAPI.get<ITutor[]>(
      `buscar_tutor.php?&sede=${sede}&franja=${franja}&id_curso=${id_curso}&dia=${day}&modalidad=${modeTutorial}`,
    );
    return resp.data;
  };

  /**
   * Retrieves detailed information about a specific tutor.
   * @async
   * @public
   * @static
   * @param id_course The ID of the course that the tutor is available for.
   * @param day The day that the tutor is available.
   * @param franja The time slot that the tutor is available.
   * @param id_tutor The ID of the tutor to retrieve information for.
   * @param sede The campus where the course is offered.
   * @returns A Promise that resolves to an ITutorInfoResp object.
   */
  public static getInfoTutor = async (
    id_course: string,
    day: string,
    franja: string,
    id_tutor: string,
    sede: string,
  ): Promise<ITutorInfoResp> => {
    const resp = await tutoriasAPI.get<ITutorInfoResp>(
      `/buscar_info_tutor.php?sede=${sede}&id_curso=${id_course}&dia=${day}&franja=${franja}&id_tutor=${id_tutor}`,
    );
    return resp.data;
  };

  /**
   * Retrieves all tutoring sessions for a specific user.
   * @async
   * @public
   * @static
   * @param id The ID of the user to retrieve tutoring sessions for.
   * @returns A Promise that resolves to an ITutoriaResp object.
   */
  public static getAllTutoriasByUser = async (
    id: string,
  ): Promise<ITutoriaResp> => {
    const resp = await tutoriasAPI.get<ITutoriaResp>(
      `/buscar_tutorias_estudiante.php?documento=${id}`,
    );
    return resp.data;
  };

  /**
   * Retrieves the photo of a specific user.
   * @public
   * @static
   * @async
   * @override This is the child class's implementation of the parent User's class static method.
   * @param email The email address of the tutor to retrieve the photo for.
   * @returns A Promise that resolves to an object with a URI property containing the photo URL.
   */
  public static getUserPhoto = async (
    email: string = '',
  ): Promise<{uri: string}> => {
    const userImage: Blob = await GraphManager.getUserPhotoAsync(email);
    const answerBase64: string = await blobToBase64(userImage);
    const photo: string[] = answerBase64.split(',');
    const resp: string = `data:image/png;base64,${photo[1]}`;
    return {uri: resp};
  };

  /**
   * Creates a new tutoring session.
   * @public
   * @static
   * @async
   * @param obj An object that contains the details of the new tutoring session.
   * @returns A Promise that resolves to the response data.
   */
  public static postInsertTutoria = async (obj: ICreateCita): Promise<any> => {
    const resp: AxiosResponse<any, any> = await tutoriasAPI.post(
      '/crear_cita.php',
      obj,
    );
    return resp.data;
  };
}
