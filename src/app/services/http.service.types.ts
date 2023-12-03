export interface IOrdersDataReq {
  StartRow?: number;
  EndRow?: number;
  FilterModel: Record<string, IFilterModel>;
  SortModel: ISortModel[];
}

export interface IFilterModel extends IFilterModelEntity {
  Conditions: IFilterModelEntity[];
  Operator: 'AND' | 'OR' | '';
}

export interface IFilterModelEntity {
  Type: string;
  Filter: number;
  FilterType: string;
}

export interface ISortModel {
  ColId: string;
  Sort: string;
}

export interface IOrdersDataRes {
  Rows: IOrder[];
  RowCount: number;
}

export interface IOrder {
  Order_id: number;
  Order_name: string;
  Order_status: number;
  Order_is_paid: boolean;
  Is_safe_transaction: boolean;
  Status: number;
  Performer: string;
  Viewer_id: number;
  Group_id: number;
  First_name: string;
  Last_name: string;
  Photo_100: string;
  Viewer_type: string;
  Rights: number;
  Date_time: string;
  Date_time_taken: string;
  Date_time_deadline: string;
  Text: string;
  Text_length: number;
  Text_type: number;
  Text_translated: string;
  Text_translated_length: number;
  Text_translated_readiness: string;
  Text_translated_demo: string;
  Description: string;
  Timezone: number;
  Creating: number;
}

export interface ICellReq {
  Order_id: number;
  Column: string;
  Value: string;
}

export type ICallbackAction = (incomingData: IIncomingData) => void;
export type IIncomingData = {
  MesType: 'edit' | 'create' | 'update' | 'delete';
  Data?: ICellReq | IOrder | { Order_id: number };
  Order_Id?: number;
  Viewer: string;
};

export interface ICreateSession {
  Token: string;
}
