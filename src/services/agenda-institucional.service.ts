import { utsPostsCategoriesAPI } from "../api";
import { UTSPostsCategories } from "../models";

export const getAgendas = async () => {
  const resp = await utsPostsCategoriesAPI.get<UTSPostsCategories[]>('/49/numberposts/12');
  return resp
}