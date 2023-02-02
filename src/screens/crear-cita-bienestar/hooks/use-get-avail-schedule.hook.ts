import { useState } from 'react'
import { mockFranjas } from '../data';
import { Schedule } from '../models';

export const useGetAvailSchedule = () => {

  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [isLoadingSchedules, setIsLoadingSchedules] = useState<boolean>(false);

  const fetchSchedulesByIdProfessional = async (user_id: string = "") => {
    setIsLoadingSchedules(true)
    // const resp = await getScheduleByUserId(user_id, "npiconj@uts.edu.co");
    // setSchedules(resp.data)
    // setIsLoadingSchedules(false)
    setTimeout(() => {
      const resp = mockFranjas;
      setSchedules(resp.data);
      setIsLoadingSchedules(false);
    }, 1000);
  }

  return {
    fetchSchedulesByIdProfessional,
    schedules,
    isLoadingSchedules
  }
}
