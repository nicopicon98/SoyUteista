import {
  errorHandlerCelular,
  fromDMYSlashtoYMDHyphen,
  fromYMDHyphentoDMYSlash,
} from '@src/utilities';
import {
  createProfessionalItemsAdapter,
  createScheduleItemAdapter,
} from './adapters';
import {StyleSheet, Text, Dimensions, View, Appearance} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useGetAvailSchedule} from './hooks/use-get-avail-schedule.hook';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {CardBienestar} from '@src/components/card-bienestar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState, useEffect, useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Modal, Pressable} from 'react-native';
import {AuthContext} from '@src/context/auth';
import {useGetProByField} from './hooks';
import {colores} from '@src/theme';
import {FieldsDropdown} from './components/fields-dropdown';

const {width} = Dimensions.get('window');

export type TBienestarFormData = {
  id_usuario: string;
  student_celphone: string;
  id_horario: string;
  date: string;
};

export const CrearCitaBienestarScreen = () => {
  const [openFields, setOpenFields] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<TBienestarFormData>({
    defaultValues: {
      id_usuario: '',
      student_celphone: '',
      id_horario: '',
      date: '',
    },
  });

  return (
    <FieldsDropdown
      control={control}
      openFields={openFields}
      setOpenFields={setOpenFields}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContinuar: {
    width: '100%',
    backgroundColor: colores.Pantone_383_C,
    alignItems: 'center',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.02,
    borderRadius: 100,
  },
  buttonContinuarText: {
    fontSize: width * 0.042,
    fontWeight: '500',
    color: colores.White,
  },
  centeredViewFinalModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalFinalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
  },
  buttonGuardarContentChild: {
    width: width * 0.3,
    zIndex: 2000,
  },
  buttonAgendar: {
    backgroundColor: colores.Pantone_383_C,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.01,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonGuardarText: {
    fontSize: width * 0.04,
    textAlign: 'center',
    color: 'white',
  },
  buttonEliminar: {
    backgroundColor: colores.Cool_Gray_5_C,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.01,
    borderRadius: 100,
    alignItems: 'center',
  },
  redWarning: {
    color: 'red',
  },
});
