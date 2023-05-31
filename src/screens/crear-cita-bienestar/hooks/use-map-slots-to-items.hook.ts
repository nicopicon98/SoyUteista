import {useState} from 'react';
import {ISlotsMapped, slotsToItems} from '../adapters';
import {IProfessionalSchedule} from '../models';

export const useMapSlotsToItems = () => {
  const [slotsMapped, setSlotsMapped] = useState<ISlotsMapped[]>([]);

  const mapSlotsToItemsHandler = (
    date: string,
    professionalSchedule: IProfessionalSchedule[],
  ) => {
    console.log(slotsToItems(date, professionalSchedule), "slotsToItems")
    setSlotsMapped(slotsToItems(date, professionalSchedule));
  };

  return {
    mapSlotsToItemsHandler,
    slotsMapped,
  };
};
