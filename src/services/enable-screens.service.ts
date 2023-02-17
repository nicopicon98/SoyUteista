import { webserviceAPI } from "@src/api";
import { API_KEY } from "@src/config/auth";
import { IRespEnable } from "@src/screens/temp/models";

export const fetchEnabledScreensService = async (email: string, ) => {
  const rep = await webserviceAPI.get<IRespEnable>(`/enabled-modules/?key=${API_KEY}&email=${email}`);
  return rep.data
}

