import { utsPostsCategoriesAPI } from '@src/api';
import { UTSPostsCategories } from '@src/models';

export const getNoticias = async () => {
  const rep = await utsPostsCategoriesAPI.get<UTSPostsCategories[]>('/2/numberposts/12');
  return rep
}