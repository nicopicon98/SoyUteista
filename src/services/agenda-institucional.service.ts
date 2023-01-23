import { utsPostsCategoriesAPI } from "../api";
import { UTSPostsCategorias } from "../models/UTSPostsCategorias";

export const getAgendas = async () => {
  const rep = await utsPostsCategoriesAPI.get<UTSPostsCategorias[]>('/49/numberposts/12');
  return rep
}