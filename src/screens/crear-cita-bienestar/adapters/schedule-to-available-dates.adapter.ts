import {IProfessionalSchedule} from '@src/models';

export const scheduleToAvailableDates = (
  professionalsSchedule: IProfessionalSchedule[],
): string[] => {
  return professionalsSchedule.map(e => e.date);
};
