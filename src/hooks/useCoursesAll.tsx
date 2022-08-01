import { useState, useEffect} from 'react'


import tutoriasAPI from '../api/tutoriasAPI';
import { replaceNull } from '../helpers/functions';
import { CoursesAllInterface } from '../interfaces/CoursesAllInterface';

export const useCoursesAll = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courses, setCourses] = useState<CoursesAllInterface[]>();
  const [clickCourses, setClickCourses] = useState(false);

  const loadCursos = async () => {
    const rep = await tutoriasAPI.get<CoursesAllInterface[]>('load_curso.php');
    console.log(rep.data);
    setCourses(rep.data)
    setIsLoadingCourses(false);
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadCursos();
  }, [])

  return {
    isLoadingCourses,
    courses,
    loadCursos,
    setClickCourses,
    clickCourses
  }
}
