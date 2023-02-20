import { sharingInformationService } from '@src/services/sharing-information.service';
import { BajoRendManager } from '@src/services';
import { IUser } from '@src/models';
import { useEffect } from 'react';

export const useCheckBajoRendimiento = (user: IUser) => {

  const bajoRendimientoChecker = async () => {
    const token = await BajoRendManager.getFirstTimeAsync();
    if(!token) {
      if(user.userMoreInfo.C_ESTP_PROMEDIOGENERAL < 3.5) {
        return sharingInformationService.setSubject(true)
      }
    };
    return sharingInformationService.setSubject(false);
  }

  useEffect(() => {
    bajoRendimientoChecker();
  }, [])

  return {}
}
