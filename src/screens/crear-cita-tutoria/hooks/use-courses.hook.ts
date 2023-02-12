import { getAllCourses } from '@src/services';
import { useContext, useEffect, useState } from 'react'
import { Course } from '../models';
import { mockCourses } from '../data/mockdata';
import { AuthContext } from '@src/context';

export const useCourses = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const {authState: {user}} = useContext(AuthContext)

  const loadCursos = async () => {
    const rep = await getAllCourses(user?.userMoreInfo?.C_UNID_NOMBRE);
    console.log(rep.data)
    setCourses(rep.data);
    setIsLoadingCourses(false);
  }

  useEffect(() => {
    loadCursos();
  }, [])

  return {
    isLoadingCourses,
    courses,
    loadCursos,
  }
}
