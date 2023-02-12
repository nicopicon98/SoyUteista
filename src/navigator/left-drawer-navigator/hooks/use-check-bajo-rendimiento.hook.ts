import { sharingInformationService } from '@src/services/sharing-information.service';
import { User } from '@src/models';
import { useEffect } from 'react';
import { BajoRendManager } from '@src/services';

export const useCheckBajoRendimiento = (user: User) => {

  const bajoRendimientoChecker = async () => {
    const token = await BajoRendManager.getFirstTimeAsync();
    if(token !== null) {
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
