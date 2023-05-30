export interface IFieldsResp {
  data: IFields[];
  status: number;
}

export interface IFieldsReq {
  id_campus: string;
}

export interface IFields {
  name_field: string;
  id_campus_field: number;
}
