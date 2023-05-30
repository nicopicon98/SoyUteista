import {useContext, useEffect, useState} from 'react';
import { ItemType } from 'react-native-dropdown-picker';
import {AuthContext} from '@src/context/auth';
import {FieldsManager} from '@src/services';
import { fieldsToItems } from '../adapters';
import {IFields} from '../models';

export const useGetAllFieldsByCampus = () => {
  const [rawFields, setRawFields] = useState<IFields[]>([]);
  const [fields, setFields] = useState<ItemType<string>[]>([]);
  const [isLoadingFields, setIsLoadingFields] = useState<boolean>(true);
  const {
    authState: {user},
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllFieldsByCampus = async () => {
      const resp = await FieldsManager.getAllByCampus({
        id_campus: user!.userMoreInfo.C_UNID_NOMBRE,
      });
      setRawFields(resp.data);
      setFields(fieldsToItems(resp.data));
      setIsLoadingFields(false);
    };
    fetchAllFieldsByCampus();
  }, []);

  return {
    fields,
    rawFields,
    isLoadingFields
  };
};
