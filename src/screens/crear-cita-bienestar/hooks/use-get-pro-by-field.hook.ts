import { IBienestarProfessional } from '../models';
import { useEffect, useState } from 'react'
import { ProfessionalManager } from '@src/services/bienestar.service';

export const useGetProByField = () => {

  const [professionals, setProfessionals] = useState<IBienestarProfessional[]>([])
  const [isLoadingProfessionals, setIsLoadingProfessionals] = useState<boolean>(false);

  const fetchProfessionalsByField = async (field: string = "odontologia") => {
    setIsLoadingProfessionals(true)
    const resp = await ProfessionalManager.getAllByField(field, "npiconj@uts.edu.co");
    setProfessionals(resp)
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
