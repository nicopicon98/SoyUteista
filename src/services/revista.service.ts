import { revistaAPI } from "@src/api";
import { RevistaResp } from "@src/models";

export const getRevista = async () => {
  const resp = await revistaAPI.get<RevistaResp[]>('/getNewsletter.php');
  return resp
}