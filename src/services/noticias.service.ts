import { utsPostsCategoriesAPI } from '../api';
import { UTSPostsCategories } from '../models';

export const getNoticias = async () => {
  const rep = await utsPostsCategoriesAPI.get<UTSPostsCategories[]>('/2/numberposts/12');
  return rep
}