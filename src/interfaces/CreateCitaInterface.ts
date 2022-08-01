export interface CreateCitaInterface {
  id_tipo_tutor : string;
  documento     : string;
  nombre        : string;
  programa      : string;
  sexo          : 'M';
  jornada       : string;
  correo        : string;
  celular       : string;
  comentarios   : string;
  tema          : string;
  franja        : string;
}

export interface RespCreateCitaInterface {
  result: number;
  error:  string;
}
