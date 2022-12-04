import {useState} from 'react';
import { TutoriasInsertInterface } from '../interfaces/TutoriasInsertInterface';
import useEffect from 'react';
import tutoriasAPI from '../api/tutoriasAPI';
import { FieldValues } from 'react-hook-form';


export const useTutoriasInsert = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [respuestaTutoriaInsert, setRespuestaTutoriaInsert] = useState<TutoriasInsertInterface>();


const insertTutoria = async (formData: FieldValues) => {
  console.log(formData);
  const respuesta = await tutoriasAPI.post('/crear_cita.php', formData);
  console.log(respuesta.data);
}
  
  return {
    insertTutoria,
    ...respuestaTutoriaInsert,
    isLoading
  }
}
