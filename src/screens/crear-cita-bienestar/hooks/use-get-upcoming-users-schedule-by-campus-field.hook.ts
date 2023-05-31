import {ProfessionalScheduleManager} from '@src/services/bienestar';
import {ItemType} from 'react-native-dropdown-picker';
import {useState} from 'react';
import {IProfessionalSchedule} from '@src/models';
import {scheduleToAvailableDates} from '../adapters/schedule-to-available-dates.adapter';

export const useGetUpcomingUsersScheduleByCampusField = () => {
  const [upcomingUsersScheduleRaw, setUpcomingUsersScheduleRaw] =
    useState<IProfessionalSchedule[]>();
  const [upcomingUsersScheduleMapped, setUpcomingUsersScheduleMapped] =
    useState<string[]>([]);
  const [isLoadingUspcomingUsersSchedule, setIsLoadingUpcomingUsersSchedule] =
    useState<boolean>(true);

  const fetchAllUpcomingUsersSchedule = async (id_campus_field: string) => {
    setIsLoadingUpcomingUsersSchedule(true); // Set loading state to true before fetching
    const resp = await ProfessionalScheduleManager.getAllUpcomingByCampusField({
      id_campus_field,
    });
    setUpcomingUsersScheduleRaw(resp.data);
    setUpcomingUsersScheduleMapped(scheduleToAvailableDates(resp.data));
    setIsLoadingUpcomingUsersSchedule(false); // Set loading state to false after fetching
  };

  return {
    upcomingUsersScheduleRaw,
    upcomingUsersScheduleMapped,
    isLoadingUspcomingUsersSchedule,
    fetchAllUpcomingUsersSchedule,
  };
};
