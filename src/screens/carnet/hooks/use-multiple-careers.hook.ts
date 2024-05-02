import { IUser } from '@src/models';
import { useCallback, useEffect, useState } from 'react';

export const useMultipleCareers = (user: IUser) => {
  const [twoCareers, setTwoCareers] = useState<boolean>(false);

  // `useCallback` para memorizar la función que verifica las carreras
  const checkCareers = useCallback(() => {
    if (user?.userMoreInfo2?.length > 1 && user.userMoreInfo2[0].C_ESTP_ID !== user.userMoreInfo2[1].C_ESTP_ID) {
      setTwoCareers(true);
    } else {
      setTwoCareers(false);
    }
  }, [user]);  // Dependencia a `user` ya que la verificación depende de los datos del usuario

  // `useEffect` para ejecutar la verificación cuando el usuario cambie
  useEffect(() => {
    checkCareers();
  }, [checkCareers]);  // Dependencia a `checkCareers`, que ya incluye `user` indirectamente

  return {
    twoCareers,
  };
};
