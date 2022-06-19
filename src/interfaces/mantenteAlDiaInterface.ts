export interface mantenteAlDiaInterface {
  result:   number;
  noticias: NoticiaInterface[];
}

export interface NoticiaInterface {
  categoria:   string;
  titulo:      string;
  descripcion: string;
  fecha:       string;
  foto:        string;
  url:         string;
}