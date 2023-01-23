import { useState, useEffect} from 'react'


import tutoriasAPI from '../api/tutorias.api';
import { replaceNull } from '../helpers/functions';
import { CoursesAllInterface } from '../models/CoursesAllInterface';

export const useCoursesAll = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [courses, setCourses] = useState<CoursesAllInterface[]>();
  const [clickCourses, setClickCourses] = useState(false);

  const loadCursos = async () => {
    setIsLoadingCourses(true);
    const rep = await tutoriasAPI.get<CoursesAllInterface[]>('load_curso.php');
    console.log(rep.data);
    setCourses(rep.data);
    setIsLoadingCourses(false);
  }

  return {
    isLoadingCourses,
    courses,
    loadCursos,
    setClickCourses,
    clickCourses
  }
}
