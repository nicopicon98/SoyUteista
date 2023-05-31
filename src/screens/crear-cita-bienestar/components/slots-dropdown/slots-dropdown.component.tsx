import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Appearance, useWindowDimensions} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {TBienestarFormData} from '../../models';
import {Text} from 'react-native-paper';
import {useState} from 'react';
import {colores} from '@src/theme';

interface Props {
  control: Control<TBienestarFormData, any>;
  openSlots: boolean;
  setOpenSlots: React.Dispatch<React.SetStateAction<boolean>>;
  setDropDownSlots: React.Dispatch<React.SetStateAction<string>>;
  dropDownSlots: string
  items: ItemType<string>[];
  onClickSlotItem: (v: string) => void;
}

export const SlotsDropdown = ({
  control,
  openSlots,
  setOpenSlots,
  items,
  onClickSlotItem,
  dropDownSlots, setDropDownSlots
}:Props) => {
  const colorSchema = Appearance.getColorScheme();
  const {width} = useWindowDimensions();

  return (
    <>
      <Text
        style={{
          maxWidth: width * 0.9,
          alignSelf: 'flex-start',
          marginBottom: width * 0.02,
          marginTop: width * 0.03,
          color: colores.Pantone_382_C,
        }}>
        Ahora, elige una franja horaria:
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <DropDownPicker
            addCustomItem={false}
            placeholder={'Selecciona una franja horaria'}
            listMode="MODAL"
            searchable
            searchTextInputProps={{
              maxLength: 25,
            }}
            theme={colorSchema === 'dark' ? 'DARK' : 'LIGHT'}
            searchPlaceholder="Ingresa una franja horaria"
            open={openSlots}
            value={dropDownSlots}
            items={items}
            setOpen={setOpenSlots}
            setValue={setDropDownSlots}
            listItemContainerStyle={{
              width: '100%',
              borderBottomWidth: 1,
            }}
            onSelectItem={({value}) => {
              onChange(value);
              onClickSlotItem(value!);
            }}
          />
        )}
        name="id_time_slot"
      />
    </>
  );
};
