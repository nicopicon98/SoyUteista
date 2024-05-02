import {Dispatch, SetStateAction} from 'react';
import {Appearance} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const colorSchema = Appearance.getColorScheme();

interface IPickCareerDropdownProps {
  carrer: string;
  setCarrer: Dispatch<SetStateAction<string>>;
  openCarreerDropdown: boolean;
  setOpenCarreerDropdown: Dispatch<SetStateAction<boolean>>;
  items: Array<{label: string; value: string; key: number}>;
  handleSelectItem: (value: string) => void;
}

export const PickCareerDropdown = ({
  carrer,
  setCarrer,
  openCarreerDropdown,
  setOpenCarreerDropdown,
  items,
  handleSelectItem,
}: IPickCareerDropdownProps) => {
  return (
    <DropDownPicker
      theme={colorSchema === 'dark' ? 'DARK' : 'LIGHT'}
      items={items}
      open={openCarreerDropdown}
      value={carrer}
      listMode="MODAL"
      setOpen={setOpenCarreerDropdown}
      setValue={setCarrer}
      placeholder="Seleccione un programa académico"
      onSelectItem={({value}) => handleSelectItem(value!)}
      style={{
        borderRadius: 0,
        borderBottomWidth: 0.4,
      }}
    />
  );
};
