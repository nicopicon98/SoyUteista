import {IProfessionalSchedule} from '../models';

export interface ISlotsMapped {
  label: string;
  value: string;
}

export const slotsToItems = (
  date: string,
  professionalSchedule: IProfessionalSchedule[],
): ISlotsMapped[] => {
  // Convert date into a format that matches the format of the dates in the input data
  const selectedDate = new Date(date).toISOString().split('T')[0];

  // Find the object for the selected date
  const selectedDaySchedule = professionalSchedule.find(
    item => item.date.split('T')[0] === selectedDate,
  );
  console.log('Selected Day Schedule:', selectedDaySchedule);

  // If there's no schedule for the selected date, return an empty array
  if (!selectedDaySchedule) {
    return [];
  }

  // Extract the time slots and transform them into the required format
  let slots: ISlotsMapped[] = [];

  for (let user of selectedDaySchedule.user_time_slot) {
    let userSlots = user.time_slots.map(timeSlot => ({
      label: timeSlot.name_time_slot,
      value: timeSlot.id_time_slot.toString(),
    }));

    slots = [...slots, ...userSlots];
  }

  return slots;
};
