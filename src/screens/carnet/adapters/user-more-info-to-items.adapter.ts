import {IUser} from '@src/models';

export const userMoreInfoToItemsAdapter = (user: IUser) => {
  return user.userMoreInfo2.map((info, index) => ({
    label: info.C_PROG_NOMBRE,
    value: info.C_PROG_NOMBRE,
    key: index, // Using index as key here for simplicity, consider using a unique identifier
  }));
};
