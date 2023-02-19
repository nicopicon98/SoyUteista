export interface IDirectorioEscolarResp {
  dependencia: string;
  infoDependencia: IInfoDependencia[];
}

export interface IInfoDependencia {
  dependenciaNombre: string;
  idContactoDependencia: number;
  nombre: string;
  profesion: string;
  correo: string;
  extension: number;
  idDependencia: number;
  fechaRegistro: string;
}
