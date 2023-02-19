import { getAllProfessionalsByfield } from '@src/services/bienestar.service';
import { IBienestarProfessional } from '../models';
import { useEffect, useState } from 'react'

export const useGetProByField = () => {

  const [professionals, setProfessionals] = useState<IBienestarProfessional[]>([])
  const [isLoadingProfessionals, setIsLoadingProfessionals] = useState<boolean>(false);

  const fetchProfessionalsByField = async (field: string = "odontologia") => {
    setIsLoadingProfessionals(true)
    const resp = await getAllProfessionalsByfield(field, "npiconj@uts.edu.co");
    setProfessionals(resp.data)
    setIsLoadingProfessionals(false)
  }

  useEffect(() => {
    fetchProfessionalsByField();
  }, [])
  

  return {
    professionals,
    fetchProfessionalsByField,
    isLoadingProfessionals
  }
}
