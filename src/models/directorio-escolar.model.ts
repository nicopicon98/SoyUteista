export interface DirectorioEscolar {
  dependencia:     string;
  infoDependencia: InfoDependencia[];
}

export interface InfoDependencia {
  dependenciaNombre:     string;
  idContactoDependencia: number;
  nombre:                string;
  profesion:             string;
  correo:                string;
  extension:             number;
  idDependencia:         number;
  fechaRegistro:         string;
}
