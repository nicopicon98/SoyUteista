import { postInsertCitaTutoria } from '@src/services';
import { FieldValues } from 'react-hook-form';
import { CreateCitaResp } from '@src/models';
import { useState } from 'react';


export const useInsertTutorias = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [respuestaTutoriaInsert, setRespuestaTutoriaInsert] = useState<CreateCitaResp>();


  const insertTutoria = async (formData: FieldValues) => {
    setIsLoading(true);
    console.log(formData);
    const resp = await postInsertCitaTutoria(formData);
    setIsLoading(false);
    console.log(resp.data)
  }

  return {
    insertTutoria,
    ...respuestaTutoriaInsert,
    isLoading
  }
}
