import {Appearance, useWindowDimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Control, Controller} from 'react-hook-form';
import {TBienestarFormData} from '../../';
import {Text} from 'react-native-paper';

interface Props {
  control: Control<TBienestarFormData, any>;
  openFields: boolean;
  setOpenFields: React.Dispatch<React.SetStateAction<boolean>>;
}

const {width} = useWindowDimensions();
const colorSchema = Appearance.getColorScheme();
export const FieldsDropdown = ({control, openFields, setOpenFields}: Props) => {
  const coursesView = (
    <>
      <Text
        style={{
          maxWidth: width * 0.9,
          alignSelf: 'flex-start',
        }}>
        A continuación elige de la salud
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
            value={dropDownCourses}
            items={coursesItems}
            setOpen={setOpenCourses}
            setValue={setDropDownCourses}
            setItems={setCoursesItems}
            onSelectItem={({value}) => {
              onChange(value);
              onSelectCourse(value!);
            }}
            style={{
              alignSelf: 'flex-start', // Changed from 'center' to 'flex-start'
              width: '100%',
              marginTop: width * 0.03,
            }}
            listItemContainerStyle={{
              width: '100%',
              borderBottomWidth: 1,
            }}
            containerStyle={{...styles.dropdownCommonContainer}}
          />
        )}
        name="id_course"
      />
    </>
  );
  return coursesView;
};
