import { revistaAPI } from "@src/api";
import { IRevistaResp } from "@src/models";

export const getRevista = async () => {
  const resp = await revistaAPI.get<IRevistaResp[]>('/getNewsletter.php');
  return resp
}