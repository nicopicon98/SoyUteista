import {ProfessionalScheduleManager} from '@src/services/bienestar';
import {ItemType} from 'react-native-dropdown-picker';
import {useState} from 'react';
import {IProfessionalSchedule} from '@src/models';

export const useGetUpcomingUsersScheduleByCampusField = () => {
  const [upcomingUsersScheduleRaw, setUpcomingUsersScheduleRaw] =
    useState<IProfessionalSchedule[]>();
  const [upcomingUsersSchedule, setUpcomingUsersSchedule] = useState<
    ItemType<string>[]
  >([]);
  const [isLoadingUspcomingUsersSchedule, setIsLoadingUpcomingUsersSchedule] =
    useState<boolean>(true);

  const fetchAllFieldsByCampus = async (id_campus_field: string) => {
    console.log(id_campus_field, "from hook")
    const resp = await ProfessionalScheduleManager.getAllUpcomingByCampusField({
      id_campus_field,
    });
    console.log(resp, "from hook");
    setUpcomingUsersScheduleRaw(resp.data);
    // setFields(fieldsToItems(resp.data));
    setIsLoadingUpcomingUsersSchedule(false);
  };

  return {
    upcomingUsersScheduleRaw,
    upcomingUsersSchedule,
    isLoadingUspcomingUsersSchedule,
    fetchAllFieldsByCampus,
  };
};
