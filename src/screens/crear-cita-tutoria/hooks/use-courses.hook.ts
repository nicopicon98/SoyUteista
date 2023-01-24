import { getAllCourses } from '@src/services';
import { CoursesAll } from '@src/models';
import { useState } from 'react'

export const useCourses = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [courses, setCourses] = useState<CoursesAll[]>();
  const [clickCourses, setClickCourses] = useState(false);

  const loadCursos = async () => {
    setIsLoadingCourses(true);
    const rep = await getAllCourses();
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
