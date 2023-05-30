import {webserviceAPI} from '@src/api';

export interface ICommonResp {
  image?: string;
  msg?: string;
}

export interface IMaintenanceInfo extends ICommonResp {
  is_under_maintenance: number;
}

export interface IUpdateCheckerInfo extends ICommonResp {
  is_update_required: number;
}

export interface ICampaignInfo extends ICommonResp {
  is_campaign_running: number;
}

export interface IAPPBootBasicInfo {
  maintenance: IMaintenanceInfo;
  update_checker: IUpdateCheckerInfo;
  campaign: ICampaignInfo;
}

export class BootBasicInfo {
  public static getAll = async (obj: {
    phone_version: string;
  }): Promise<IAPPBootBasicInfo> => {
    const resp = await webserviceAPI.post<IAPPBootBasicInfo>(
      `/soyuteista/get-app-basic-info`,
      obj,
    );
    console.log('version received', resp.data);
    return resp.data;
  };
}
