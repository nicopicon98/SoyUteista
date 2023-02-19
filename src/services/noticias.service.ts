import { IUTSPostsCategories } from '@src/models';
import { utsPostsCategoriesAPI } from '@src/api';

export const getNoticias = async () => {
  const rep = await utsPostsCategoriesAPI.get<IUTSPostsCategories[]>('/2/numberposts/12');
  return rep
}