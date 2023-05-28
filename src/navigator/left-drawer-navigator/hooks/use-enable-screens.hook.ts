import { useState, useEffect, useContext } from 'react';
import { EnabledScreensService } from '@src/services';
import { IEnable } from '@src/screens/temp/models';
import { AuthContext } from '@src/context/auth';

export const useEnabledScreens = () => {
  const {
    authState: {user},
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [enabledScreens, setEnabledScreens] = useState<IEnable[]>([]);

  const enableChecker = (data: IEnable[], screenStr: string) => {
    const screenData = data.find(e => e.nombre === screenStr);
    return screenData ? screenData.habilitado : 2; //doesn't exist
  };

  const fetchEnabledScreens = async () => {
    try {
      const resp = await EnabledScreensService.getAll(user!.userEmail);
      setEnabledScreens(resp.data);
    } catch (error) {
      console.error("Failed to fetch enabled screens", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnabledScreens();
  }, []);

  return { isLoading, enabledScreens, enableChecker };
};
