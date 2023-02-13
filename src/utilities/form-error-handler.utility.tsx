import { Text } from 'react-native';

export const errorHandlerCelular = (type: string): JSX.Element => {
  switch (type) {
    case "required":
      return <Text>El campo es requerido</Text>;
    case "minLength":
    case "pattern":
      return <Text>Ingresa un numero de celular valido</Text>;
    default:
      return <></>;
  }
}