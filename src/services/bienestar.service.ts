import { webserviceAPI } from '@src/api/web-service.api';
import { API_KEY } from '@src/config/auth';

export const getAllProfessionalsByfield = async (field: string, email: string) => {
  const resp = await webserviceAPI.get(`/bienestar/professionals-by-field/?field=${field}&key=${API_KEY}&email=${email}`)
  return resp.data
}

export const getScheduleByUserId = async(user_id: string, email: string) => {
  const resp = await webserviceAPI.get(`/bienestar/calendar-by-user-id/?user_id=${user_id}&key=${API_KEY}&email=${email}`)
  return resp.data
}