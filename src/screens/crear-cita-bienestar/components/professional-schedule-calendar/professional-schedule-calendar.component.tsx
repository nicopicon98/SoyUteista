import {Controller, Control} from 'react-hook-form';
import {TBienestarFormData} from '../../models';
import {View} from 'react-native-animatable';
import {Dimensions, Text} from 'react-native';
import React from 'react';
import {colores} from '@src/theme';
import { ScheduleCalendar } from '../schedule-calendar';

interface IProps {
  markedDay: string;
  control: Control<TBienestarFormData, any>;
  onPressDate: (date: string) => void;
  upcomingUsersScheduleMapped: string[];
}

const {width} = Dimensions.get('window');
export const ProfessionalScheduleCalendar: React.FC<IProps> = ({
  markedDay,
  onPressDate,
  control,
  upcomingUsersScheduleMapped,
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={{marginLeft: -10}}>
          <Text style={{color: colores.Pantone_382_C, marginTop: width * 0.05}}>
            Ahora, elige una de las siguientes fechas
          </Text>
          <ScheduleCalendar
            markedDay={markedDay}
            onChangeDate={onChange}
            onPressDate={onPressDate}
            upcomingUsersScheduleMapped={upcomingUsersScheduleMapped}
          />
        </View>
      )}
      name="date"
    />
  );
};
