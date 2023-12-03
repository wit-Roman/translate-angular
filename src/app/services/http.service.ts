import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IServerSideGetRowsRequest } from 'ag-grid-community';
import { BrowserStorageService } from '../services/storage.service';
import type {
  ICallbackAction,
  ICellReq,
  IFilterModel,
  IIncomingData,
  IOrder,
  IOrdersDataReq,
  IOrdersDataRes,
} from './http.service.types';

//const sourceUrl = 'https://test.apps-web.xyz';
const sourceUrl = 'http://localhost:3001';

@Injectable()
export class HttpService {
  storage = new BrowserStorageService(window.localStorage);
  viewer = '';
  private headers?: { headers: { Authorization: string } }; // TODO: сделать проверку хеша на каждый запрос

  constructor(private http: HttpClient) {
    this.viewer = this.storage.get('login') || '';
    const token = this.storage.get('token') || '';
    this.headers = { headers: { Authorization: token } };
  }

  public get isAuth() {
    return !!(this.headers?.headers.Authorization && this.viewer);
  }

  createSession(login: string, hash: string) {
    const params = {
      Login: login,
      Hash: hash,
    };

    return this.http
      .post<string>(sourceUrl + '/session_create', params, this.headers)
      .subscribe((token: string) => {
        this.headers = { headers: { Authorization: token } };
        this.viewer = login;

        this.storage.set('login', login);
        this.storage.set('token', token);

        return true;
        //return new Observable();
      });
  }

  getData(params?: IOrdersDataReq) {
    return this.http.post<IOrdersDataRes>(
      sourceUrl + '/orders_data',
      params,
      this.headers
    );
  }

  createOrder(order: Omit<IOrder, 'Order_id'>) {
    return this.http.post<{ LastIndex: 68 }>( /// TODO:
      sourceUrl + '/orders_create',
      order,
      this.headers
    );

    /*return new Observable((observer) => {
      // observable execution
      observer.next(params);
    });*/
  }

  updateOrder() {}

  removeOrder(id: number) {
    return this.http.get<'Deleted'>(
      sourceUrl + '/orders_delete?id=' + id,
      this.headers
    );
  }

  getOrderById(id: number) {
    return this.http.get<IOrder>(
      sourceUrl + '/orders_getById?id=' + id,
      this.headers
    );
  }

  updateCell(params: ICellReq) {
    return this.http.post<IOrdersDataRes>(
      sourceUrl + '/orders_cellEdit',
      params,
      this.headers
    );
  }

  eventSource: EventSource | null = null;
  isEventSourceOpen = false;
  private sseOpen(url: string, callbackAction: ICallbackAction) {
    if (!this.isEventSourceOpen && !!window.EventSource) {
      this.eventSource = new EventSource(url); // TODO: headers
      this.isEventSourceOpen = true;

      this.eventSource.addEventListener('message', (e) => {
        e.data && this.listenMessage(JSON.parse(e.data), callbackAction);
      });
    }
  }
  listenMessage(incomingData: IIncomingData, callbackAction: ICallbackAction) {
    if (!incomingData?.MesType || incomingData.Viewer === this.viewer) return;

    callbackAction(incomingData);
  }
  backStartListen(callbackAction: ICallbackAction) {
    if (!this.viewer) return;

    this.sseOpen(sourceUrl + '/orders_listen?v=' + this.viewer, callbackAction);
  }
}

export const createHelper = {
  transformFilterParams: (paramsRequest: IServerSideGetRowsRequest) => {
    const FilterModel = {};
    Object.entries(paramsRequest.filterModel).map(
      ([key, model]: [string, any]) => {
        const {
          type,
          dateFrom,
          dateTo,
          filter,
          filterTo,
          filterType,
          operator,
          conditions,
        } = model;
        // @ts-ignore
        FilterModel[key] = {
          Type: type || '',
          Filter: filter || filter === 0 ? filter + '' : '',
          FilterTo: filterTo || filterTo === 0 ? filterTo + '' : '',
          DateTo: dateTo || '',
          DateFrom: dateFrom || '',
          FilterType: filterType || '',
          Operator: operator || '',
          Conditions:
            conditions?.map((condition: any) => ({
              Type: condition.type,
              DateFrom: condition.dateFrom || '',
              DateTo: condition.dateTo || '',
              Filter:
                condition.filter || condition.filter === 0
                  ? condition.filter + ''
                  : '',
              FilterTo:
                condition.filterTo || condition.filterTo === 0
                  ? condition.filterTo + ''
                  : '',
              FilterType: condition.filterType,
            })) || [],
        } as IFilterModel;
      }
    );

    return {
      StartRow: paramsRequest.startRow ?? -1,
      EndRow: paramsRequest.endRow ?? -1,
      FilterModel,
      SortModel: paramsRequest.sortModel.map((item) => ({
        ColId: item.colId,
        Sort: item.sort,
      })),
    } as IOrdersDataReq;
  },
};

export const generateOrder = (): Omit<IOrder, 'Order_id'> => {
  const r = Math.random();
  const params: Omit<IOrder, 'Order_id'> = {
    Order_name: r.toString().substring(2),
    Order_status: 4,
    Order_is_paid: false,
    Is_safe_transaction: false,
    Status: 3,
    Performer: r.toString().substring(5),
    Viewer_id: parseInt(r.toString().substring(14)),
    Group_id: 2,
    First_name: r.toString().substring(5),
    Last_name: r.toString().substring(5),
    Photo_100: r.toString().substring(5),
    Viewer_type: r.toString().substring(5),
    Rights: 0,
    Date_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
    Date_time_taken: new Date().toISOString().slice(0, 19).replace('T', ' '),
    Date_time_deadline: new Date().toISOString().slice(0, 19).replace('T', ' '),
    Text:
      r.toString().substring(2) +
      r.toString().substring(2) +
      r.toString().substring(2) +
      r.toString().substring(2),
    Text_length: r.toString().substring(2).length * 4,
    Text_type: 3,
    Text_translated:
      r.toString().substring(2) +
      r.toString().substring(2) +
      r.toString().substring(2),
    Text_translated_length: r.toString().substring(2).length * 3,
    Text_translated_readiness: '75%',
    Text_translated_demo: Math.random().toString().substring(2),
    Description: r.toString().substring(2),
    Timezone: 2,
    Creating: Date.now(),
  };

  return params;
};
