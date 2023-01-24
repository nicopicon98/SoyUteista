import { utsPostsCategoriesAPI } from "@src/api";
import { UTSPostsCategories } from "@src/models";

export const getAgendas = async () => {
  const resp = await utsPostsCategoriesAPI.get<UTSPostsCategories[]>('/49/numberposts/12');
  return resp
}