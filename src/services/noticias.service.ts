import { utsPostsCategoriesAPI } from '../api';
import { UTSPostsCategorias } from '../models/UTSPostsCategorias';

export const getNoticias = async () => {
  const rep = await utsPostsCategoriesAPI.get<UTSPostsCategorias[]>('/2/numberposts/12');
  return rep
}