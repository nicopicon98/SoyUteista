import {
  ProfessionalScheduleCalendar,
} from './components/professional-schedule-calendar';
import {useGetUpcomingUsersScheduleByCampusField} from './hooks';
import {FieldsDropdown} from './components/fields-dropdown';
import {useGetAllFieldsByCampus} from './hooks';
import {TBienestarFormData} from './models';
import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

export const CrearCitaBienestarScreen = () => {
  //fields
  const [openFields, setOpenFields] = useState(false);
  const {fields, rawFields, isLoadingFields} = useGetAllFieldsByCampus();

  //professionals schedule
  const {fetchAllFieldsByCampus, upcomingUsersScheduleRaw} =
    useGetUpcomingUsersScheduleByCampusField();

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<TBienestarFormData>({
    defaultValues: {
      id_campus_field: '',
    },
  });

  //click on item
  const clickFieldItemHandler = async (value: string): Promise<void> => {
    fetchAllFieldsByCampus(value);
  };

  //components
  const fieldsDropdown = (
    <FieldsDropdown
      control={control}
      openFields={openFields}
      setOpenFields={setOpenFields}
      items={fields}
      onClickFieldItem={clickFieldItemHandler}
    />
  );

  const professionalScheduleCalendar = (
    <ProfessionalScheduleCalendar control={control} />
  );

  //form-values
  console.log(control._fields);

  return <>{fieldsDropdown}</>;
};
