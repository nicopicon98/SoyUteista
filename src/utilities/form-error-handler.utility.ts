import { CommonErrors } from './common-errors.utility';

export const errorHandlerCelular = (type: string): string => {
  switch (type) {
    case "required":
      return CommonErrors.REQUIRED_FIELD;
    case "minLength":
    case "pattern":
      return CommonErrors.INVALID_CELPHONE_NUMER;
    default:
      return "";
  }
}