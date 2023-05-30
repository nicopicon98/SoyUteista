import {Calendar, LocaleConfig} from 'react-native-calendars';
import {scheduleDataToCalendarFormat} from '../../adapters/';
import {Controller, Control} from 'react-hook-form';
import {IProfessionalSchedule} from '@src/models';
import React, {useState, useEffect} from 'react';
import {TBienestarFormData} from '../../models';
import {ScheduleCalendar} from '../schedule-calendar';

interface IProps {
  scheduleData: IProfessionalSchedule[];
  markedDay: string;
  control: Control<TBienestarFormData, any>;
  onPressDate: (date: string) => void;
}

export const ProfessionalScheduleCalendar: React.FC<IProps> = ({
  scheduleData,
  markedDay,
  onPressDate,
  control,
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <ScheduleCalendar 
          markedDay={markedDay} 
          onChangeDate={onChange}
          onPressDate={onPressDate}
          />
      )}
      name="date"
    />
  );
};
