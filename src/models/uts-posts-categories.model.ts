export interface IUTSPosts {
  id: number;
  fecha: string;
  titulo: string;
  url: string;
  foto: string;
  descripcion: string;
  categoria: string;
}

export enum EUTSPostsCategories {
  NOTICIAS = 2,
  AGENDA = 49
}