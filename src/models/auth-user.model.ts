export interface IUserAuthResponse {
  acct: number;
  acr: string;
  aio: string;
  amr: string[];
  app_displayname: string;
  appid: string;
  appidacr: string;
  aud: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  idtyp: string;
  ipaddr: string;
  iss: string;
  name: string;
  nbf: number;
  oid: string;
  platf: string;
  puid: string;
  rh: string;
  scp: string;
  sub: string;
  tenant_region_scope: string;
  tid: string;
  unique_name: string;
  upn: string;
  uti: string;
  ver: string;
  wids: string[];
  xms_st: IXMSSt;
  xms_tcdt: number;
}

export interface IXMSSt {
  sub: string;
}