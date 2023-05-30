import {webserviceAPI} from '@src/api';
import {IProfessionalScheduleReq, IProfessionalScheduleResp} from '@src/models';

export class ProfessionalScheduleManager {
  static getAllUpcomingByCampusField = async ({
    id_campus_field,
  }: IProfessionalScheduleReq): Promise<IProfessionalScheduleResp> => {
    const resp = await webserviceAPI.post(
      `/bienestar/get-all-upcoming-user-time-slots-date-by-campus`,
      {id_campus_field},
    );
    return resp.data;
  };
}
