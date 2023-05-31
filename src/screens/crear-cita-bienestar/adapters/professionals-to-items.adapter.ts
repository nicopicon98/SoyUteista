import {IProfessionalSchedule} from '../models';

export interface IProfessionalsMapped {
  label: string;
  value: string;
}

export const professionalsToItems = (
  date: string,
  id_time_slot: number,
  professionalSchedule: IProfessionalSchedule[],
): IProfessionalsMapped[] => {
  // Convert date into a format that matches the format of the dates in the input data
  const selectedDate = new Date(date).toISOString().split('T')[0];

  // Find the object for the selected date
  const selectedDaySchedule = professionalSchedule.find(
    item => item.date.split('T')[0] === selectedDate,
  );

  // If there's no schedule for the selected date, return an empty array
  if (!selectedDaySchedule) {
    return [];
  }

  // Extract the users who have the given id_time_slot and transform them into the required format
  let professionals: IProfessionalsMapped[] = [];

  for (let user of selectedDaySchedule.user_time_slot) {
    let selectedTimeSlot = user.time_slots.find(
      timeSlot => timeSlot.id_time_slot === id_time_slot,
    );

    if (selectedTimeSlot) {
      professionals.push({
        label: user.name_user,
        value: selectedTimeSlot.id_user_time_slot_date + '',
      });
    }
  }

  return professionals;
};
