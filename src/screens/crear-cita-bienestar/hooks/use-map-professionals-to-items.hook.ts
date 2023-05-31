import {useState} from 'react';
import {IProfessionalsMapped, professionalsToItems} from '../adapters';
import {IProfessionalSchedule} from '../models';

export const useMapProfessionalsToItems = () => {
  const [professionalsMapped, setProfessionalsMapped] = useState<IProfessionalsMapped[]>([]);

  const mapProfessionalsToItemsHandler = (
    date: string,
    id_time_slot: number,
    professionalSchedule: IProfessionalSchedule[]
  ) => {
    console.log(professionalsToItems(date, id_time_slot, professionalSchedule), "ProfessionalsToItems")
    setProfessionalsMapped(professionalsToItems(date, id_time_slot, professionalSchedule));
  };

  return {
    mapProfessionalsToItemsHandler,
    professionalsMapped,
  };
};
