import {IProfessionalSchedule} from '@src/models';

export const scheduleToAvailableDates = (
  professionalsSchedule: IProfessionalSchedule[],
): string[] => {
  return professionalsSchedule.map(e => new Date(e.date).toISOString().split('T')[0]);
};
