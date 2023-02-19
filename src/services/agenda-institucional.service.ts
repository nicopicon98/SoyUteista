import { utsPostsCategoriesAPI } from "@src/api";
import { IUTSPostsCategories } from "@src/models";

export const getAgendas = async () => {
  const resp = await utsPostsCategoriesAPI.get<IUTSPostsCategories[]>('/49/numberposts/12');
  return resp
}