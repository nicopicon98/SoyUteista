export interface IProfessionalScheduleResp {
  data: IProfessionalSchedule[];
  status: number;
}

export interface IProfessionalScheduleReq {
  id_campus_field: string;
}

export interface IProfessionalSchedule {
  date: string;
  user_time_slot: IProfessionalTimeSlot[];
}

export interface IProfessionalTimeSlot {
  id_user: number;
  name_user: string;
  time_slots: TimeSlot[];
}

export interface TimeSlot {
  id_time_slot: number;
  name_time_slot: string;
  id_user_time_slot_date: number;
}
