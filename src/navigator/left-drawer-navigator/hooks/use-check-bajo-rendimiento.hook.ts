import { sharingInformationService } from '@src/services/sharing-information.service';
import { BajoRendManager } from '@src/services';
import { User } from '@src/models';
import { useEffect } from 'react';

export const useCheckBajoRendimiento = (user: User) => {

  const bajoRendimientoChecker = async () => {
    const token = await BajoRendManager.getFirstTimeAsync();
    if(token === null) {
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
