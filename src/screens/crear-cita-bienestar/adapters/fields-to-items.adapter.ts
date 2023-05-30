import { ItemType } from 'react-native-dropdown-picker';
import { IFields } from '../models';

export function fieldsToItems(fields: IFields[]): ItemType<string>[] {
  return fields.map(field => ({
    label: field.name_field,
    value: field.id_campus_field.toString(),
  }));
}
