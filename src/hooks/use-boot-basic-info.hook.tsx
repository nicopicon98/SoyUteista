import {BootBasicInfo, IAPPBootBasicInfo} from '@src/services';
import {useEffect, useState, useCallback} from 'react';
import {EBookExceptionChecker} from '@src/models';
import DeviceInfo from 'react-native-device-info';
import {useSnackbar} from '@src/context/snackbar';

interface ICommonDialog {
  image?: string;
  msg?: string;
  is_open: boolean;
}

const initialCommonDialog = {
  image: '',
  msg: '',
  is_open: false,
};

export const useBootBasicInfo = () => {
  const [updateDialog, setUpdateDialog] =
    useState<ICommonDialog>(initialCommonDialog);
  const [campaignDialog, setCampaignDialog] =
    useState<ICommonDialog>(initialCommonDialog);
  const [maintenanceDialog, setMaintenanceDialog] =
    useState<ICommonDialog>(initialCommonDialog);

  const [isLoadingAppBasicInfo, setIsLoadingAppBasicInfo] =
    useState<boolean>(true);

  const {showMessage} = useSnackbar();

  const checkAndSetModal = useCallback(
    (
      checkValue: number,
      msg: string = '',
      setModal: React.Dispatch<React.SetStateAction<ICommonDialog>>,
    ) => {
      if (checkValue === EBookExceptionChecker.Required) {
        setModal(prev => {
          return {...prev, msg, is_open: true};
        });
        return true;
      }
      return false;
    },
    [],
  );

  const hideUpdateAppDialog = () => {
    setUpdateDialog(initialCommonDialog);
  };
  const hideCampaignDialog = () => {
    setCampaignDialog(initialCommonDialog);
  };
  const hideMaintenanceDialog = () => {
    setMaintenanceDialog(initialCommonDialog);
  };

  useEffect(() => {
    let isCancelled = false;
    const checkForUpdates = async () => {
      try {
        console.log(DeviceInfo);
        const phone_version: string = DeviceInfo.getVersion();
        console.log('current celphone version', phone_version);
        const response: IAPPBootBasicInfo = await BootBasicInfo.getAll({
          phone_version,
        });

        if (!isCancelled) {
          setIsLoadingAppBasicInfo(false);
          //is under maintenance
          if (
            checkAndSetModal(
              response.maintenance.is_under_maintenance,
              response.maintenance.msg,
              setMaintenanceDialog,
            )
          )
            return;
          //Is an update required
          if (
            checkAndSetModal(
              response.update_checker.is_update_required,
              response.update_checker.msg,
              setUpdateDialog,
            )
          )
            return;
          // is there any campaign to show?
          if (
            checkAndSetModal(
              response.campaign.is_campaign_running,
              response.campaign.msg,
              setCampaignDialog,
            )
          )
            return;
        }
      } catch (err) {
        if (!isCancelled) {
          setIsLoadingAppBasicInfo(false);
          showMessage(
            'Estamos temporalmente fuera de línea. ¡Volveremos pronto!',
            'warning',
            8000,
          );
        }
      }
    };

    checkForUpdates();

    return () => {
      isCancelled = true;
    };
  }, [checkAndSetModal]);

  return {
    updateDialog,
    campaignDialog,
    maintenanceDialog,
    isLoadingAppBasicInfo,
    hideUpdateAppDialog,
    hideCampaignDialog,
    hideMaintenanceDialog,
  };
};
