import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import {Appearance, useWindowDimensions} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import { TBienestarFormData } from '../../models';
import {Text} from 'react-native-paper';
import {useState} from 'react';

interface Props {
  control: Control<TBienestarFormData, any>;
  openFields: boolean;
  setOpenFields: React.Dispatch<React.SetStateAction<boolean>>;
  items: ItemType<string>[];
  onClickFieldItem: (value: string) => Promise<void>;
}

export const FieldsDropdown = ({
  control,
  openFields,
  setOpenFields,
  items,
  onClickFieldItem
}: Props) => {
  const [dropDownFields, setDropDownFields] = useState('');
  const colorSchema = Appearance.getColorScheme();
  const {width} = useWindowDimensions();

  return (
    <>
      <Text
        style={{
          maxWidth: width * 0.9,
          alignSelf: 'flex-start',
        }}>
        A continuación elige un area de la salud
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <DropDownPicker
            addCustomItem={false}
            placeholder={'Selecciona un curso'}
            listMode="MODAL"
            searchable
            searchTextInputProps={{
              maxLength: 25,
            }}
            theme={colorSchema === 'dark' ? 'DARK' : 'LIGHT'}
            searchPlaceholder="Ingresa un area de la salud..."
            open={openFields}
            value={dropDownFields}
            items={items}
            setOpen={setOpenFields}
            setValue={setDropDownFields}
            listItemContainerStyle={{
              width: '100%',
              borderBottomWidth: 1,
            }}
            onSelectItem={({value}) => {
              onChange(value);
              onClickFieldItem(value!);
            }}
          />
        )}
        name="id_campus_field"
      />
    </>
  );
};
