import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Appearance, useWindowDimensions} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {TBienestarFormData} from '../../models';
import {Text} from 'react-native-paper';
import {useState} from 'react';
import {colores} from '@src/theme';

interface Props {
  control: Control<TBienestarFormData, any>;
  openProfessionals: boolean;
  setOpenProfessionals: React.Dispatch<React.SetStateAction<boolean>>;
  items: ItemType<string>[];
  onClickProfessionalItem: (value: string) => void;
  dropDownProfessionals: string;
  setDropDownProfessionals: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfessionalsDropdown = ({
  control,
  openProfessionals,
  setOpenProfessionals,
  items,
  onClickProfessionalItem,
  dropDownProfessionals,
  setDropDownProfessionals,
}: Props) => {
  const colorSchema = Appearance.getColorScheme();
  const {width} = useWindowDimensions();

  return (
    <>
      <Text
        style={{
          maxWidth: width * 0.9,
          alignSelf: 'flex-start',
          marginBottom: width * 0.02,
          marginTop: width * 0.05,
          color: colores.Pantone_382_C,
        }}>
        Por ultimo, elige el profesional:
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <DropDownPicker
            addCustomItem={false}
            placeholder={'Selecciona un area de la salud'}
            listMode="MODAL"
            searchable
            searchTextInputProps={{
              maxLength: 25,
            }}
            theme={colorSchema === 'dark' ? 'DARK' : 'LIGHT'}
            searchPlaceholder="Ingresa un area de la salud..."
            open={openProfessionals}
            value={dropDownProfessionals}
            items={items}
            setOpen={setOpenProfessionals}
            setValue={setDropDownProfessionals}
            listItemContainerStyle={{
              width: '100%',
              borderBottomWidth: 1,
            }}
            onSelectItem={({value}) => {
              onChange(value);
              onClickProfessionalItem(value!);
            }}
          />
        )}
        name="id_campus_field"
      />
    </>
  );
};
