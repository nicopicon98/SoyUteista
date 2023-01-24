import { revistaAPI } from "../api";
import { RevistaResp } from "../models";

export const getRevista = async () => {
  const resp = await revistaAPI.get<RevistaResp[]>('/getNewsletter.php');
  return resp
}