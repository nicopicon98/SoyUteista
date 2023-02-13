import { useContext, useState } from 'react'
import { getAllCourses } from '@src/services';
import { AuthContext } from '@src/context/auth';

export const useFetchCourses = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const { authState: { user } } = useContext(AuthContext)

  const onLoadCursos = async () => {
    const resp = await getAllCourses(user?.userMoreInfo?.C_UNID_NOMBRE);
    setIsLoadingCourses(false);
    return resp.data
  }

  return {
    isLoadingCourses,
    onLoadCursos,
  }
}
