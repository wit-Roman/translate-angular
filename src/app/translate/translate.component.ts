import { Router, NavigationExtras } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  SideBarDef,
  ServerSideTransaction,
  GetRowIdFunc,
  GetRowIdParams,
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  ICellEditorParams,
  StatusPanelDef,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {
  HttpService,
  createHelper,
  generateOrder,
} from '../services/http.service';
import type {
  IOrder,
  ICellReq,
  IIncomingData,
} from '../services/http.service.types';
import {
  IClickableStatusBar,
  StatusBarComponent,
} from '../status-bar/status-bar.component';

@Component({
  selector: 'translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.less'],
  host: { class: 'translate-wrapper' },
  providers: [HttpService],
})
export class TranslateComponent {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'Order_id', checkboxSelection: true },
    { field: 'Order_name', filter: 'agTextColumnFilter' },
    {
      field: 'Order_status',
      filter: 'agSetColumnFilter',

      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: cellCellEditorParams,
    },
    {
      field: 'Order_is_paid',
      filter: 'agSetColumnFilter',
      cellEditor: 'agCheckboxCellEditor',
    },
    {
      field: 'Date_time',
      filter: 'agDateColumnFilter',
      cellEditor: 'agDateStringCellEditor',
    },
    {
      field: 'Date_time_taken',
      filter: 'agDateColumnFilter',
      cellEditor: 'agDateStringCellEditor',
    },
    {
      field: 'Date_time_deadline',
      filter: 'agDateColumnFilter',
      cellEditor: 'agDateStringCellEditor',
    },
    {
      field: 'Is_safe_transaction',
      filter: 'agSetColumnFilter',
      cellEditor: 'agCheckboxCellEditor',
    },
    { field: 'Status', filter: 'agSetColumnFilter' },
    { field: 'Performer', filter: 'agTextColumnFilter' },
    {
      field: 'Viewer_id',
      editable: false,
    },
    { field: 'Group_id', editable: false },

    { field: 'First_name', filter: 'agTextColumnFilter' },
    { field: 'Last_name', filter: 'agTextColumnFilter' },
    { field: 'Photo_100' },
    { field: 'Viewer_type', filter: true },
    { field: 'Rights', filter: true },
    { field: 'Text' },
    {
      field: 'Text_length',
      filter: 'AgNumberColumnFilter',
      filterParams: {
        buttons: ['reset'],
        debounceMs: 1000,
        maxNumConditions: 1,
      },
      /*cellEditorParams: {
        precision: 0,
      } as INumberCellEditorParams,*/

      cellDataType: 'number',
    },
    { field: 'Text_type' },
    { field: 'Text_translated' },
    {
      field: 'Text_translated_length',
      filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: ['reset'],
        debounceMs: 1000,
        maxNumConditions: 1,
      },
      cellDataType: 'number',
    },
    { field: 'Text_translated_readiness', filter: true },
    { field: 'Text_translated_demo' },
    { field: 'Description' },
    { field: 'Timezone', editable: false },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    //flex: 1,
    minWidth: 100,
    editable: true,
    sortable: true,
    resizable: true,
    floatingFilter: true,
    //menuTabs: ['filterMenuTab'],
  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    //number: { filter: 'agNumberColumnFilter' }, TODO: правила редактирвоания
    /*changedCheckbox: {
      onCellValueChanged: (e) => {
        console.log('onCellClicked', e);
      },
    },*/
  };

  public sideBar: SideBarDef = { toolPanels: ['filters', 'columns'] };

  // Data that gets displayed in the grid
  public rowData: IOrder[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) gridApi!: AgGridAngular;
  //private gridApi!: GridApi<IOrder>;

  constructor(private httpService: HttpService, private router: Router) {}

  onFilterChanged(e: any) {
    console.log(e);
    //const filter = this.gridApi.getFilterInstance<ISetFilter>('Order_name');
    //filter!.refreshFilterValues();
  }

  ngOnInit() {
    //this.httpService.createSession();
  }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    //this.gridApi = params.api;

    const datasource = this.createServerSideDatasource(this.httpService);
    params.api.setServerSideDatasource(datasource);
  }

  private createServerSideDatasource(
    server: HttpService
  ): IServerSideDatasource {
    return {
      getRows: (params) => {
        console.log('[Datasource] - rows requested by grid: ', params.request);

        const _params = createHelper.transformFilterParams(params.request);

        server.getData(_params).subscribe({
          next: (data) =>
            params.success({
              rowData: data.Rows,
              rowCount: data.RowCount,
            }),
          error: (e) => {
            console.error(e);
            params.fail();
          },
          complete: () => {
            this.listen();
            //TODO: finally onload
          },
        });
      },
    };
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.gridApi.api.deselectAll();
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    `${params.data.Order_id}`;

  addRow() {
    const selectedRows = this.gridApi.api.getSelectedNodes();

    const rowIndex = selectedRows.length
      ? selectedRows[0].rowIndex || undefined
      : 0;

    const order = generateOrder() as IOrder;

    this.httpService.createOrder(order).subscribe((data) => {
      order.Order_id = data.LastIndex;
      const transaction: ServerSideTransaction = {
        addIndex: rowIndex,
        add: [order],
      };
      this.gridApi.api.applyServerSideTransaction(transaction);
      //this.gridApi.api.refreshServerSide();
    });
  }

  /*updateRow() {
    const selectedRows = this.gridApi.api.getSelectedNodes();
    if (selectedRows.length === 0) {
      console.warn('[Example] No row selected.');
      return;
    }
    const transaction: ServerSideTransaction = {
      update: [
        {
          ...selectedRows[0].data,
          current: {
            //TODO
          },
        },
      ],
    };
    this.gridApi.api.applyServerSideTransaction(transaction);
  }*/

  removeRow() {
    const selectedRows = this.gridApi.api.getSelectedNodes();
    if (selectedRows.length === 0) {
      console.warn('[Example] No row selected.');
      return;
    }

    for (const row of selectedRows) {
      this.httpService.removeOrder(row.data.Order_id).subscribe((data) => {
        const transaction: ServerSideTransaction = {
          remove: [row.data],
        };
        this.gridApi.api.applyServerSideTransaction(transaction);
        //this.gridApi.api.refreshServerSide();
      });
    }
  }

  onCellEditingStarted(event: CellEditingStartedEvent) {
    console.log('onCellEditingStarted', event);
  }

  onCellEditingStopped(event: CellEditingStoppedEvent) {
    console.log('onCellEditingStopped', event);

    let newValue = event.newValue;
    if (event.oldValue == newValue) return;

    if (newValue === true) newValue = '1'; // удобно хранить в БД
    if (newValue === false) newValue = '0';

    const params: ICellReq = {
      Order_id: event.data.Order_id,
      Column: event.colDef.field!,
      Value: newValue,
    };

    this.httpService.updateCell(params).subscribe((data) => {
      console.log('post', data);
    });
  }

  onReturningFromDetail(index: number) {
    this.gridApi.api.ensureIndexVisible(index, 'top');
  }

  editText() {
    const selectedRows = this.gridApi.api.getSelectedNodes();
    if (!selectedRows[0]) {
      console.warn('[Example] No row selected.');
      return;
    }

    const navigationExtras: NavigationExtras = {
      state: selectedRows[0].data,
    };

    const path = selectedRows[0].data.Text_type === 2 ? '/editor' : '/text';
    this.router.navigate([path], navigationExtras);
  }

  changeOnSSE = (incomingData: IIncomingData) => {
    console.log('incomingData', incomingData);

    if (!incomingData.Data) return;

    const transaction: ServerSideTransaction = {};

    switch (incomingData.MesType) {
      case 'edit':
        const _data = incomingData.Data as ICellReq;
        const _rowData = this.gridApi.api.getRowNode(_data.Order_id + '')?.data;
        transaction.update = [
          {
            ..._rowData,
            Order_id: _data.Order_id,
            [_data.Column]: _data.Value,
          },
        ];
        break;
      case 'create':
        transaction.add = [incomingData.Data];
        break;
      case 'update':
        transaction.update = [incomingData.Data];
        break;
      case 'delete':
        transaction.remove = [incomingData.Data];
        break;
    }

    this.gridApi.api.applyServerSideTransaction(transaction);

    this.activateStatusBar(incomingData);
  };

  private listen() {
    this.httpService.backStartListen(this.changeOnSSE);
  }

  public get isAuth() {
    return this.httpService.isAuth;
  }

  activateStatusBar(data: IIncomingData) {
    const statusBarComponent =
      this.gridApi.api.getStatusPanel<IClickableStatusBar>('statusBarCompKey')!;
    statusBarComponent.setVisible(true);

    statusBarComponent.pushItem({
      Viewer: data.Viewer,
      Order_Id: data.Order_Id,
      // @ts-ignore
      Column: data.Data?.Column,
      // @ts-ignore
      Value: data.Data?.Value,
      MesType: data.MesType,
    });
  }
  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: StatusBarComponent,
        key: 'statusBarCompKey',
      },
      {
        statusPanel: 'agAggregationComponent',
        statusPanelParams: {
          aggFuncs: ['count', 'sum'],
        },
      },
    ],
  };
}

const cellCellEditorParams = (params: ICellEditorParams<any>) => {
  // TODO: request
  return {
    values: [1, 2, 3, 4],
    formatValue: (value: any) => `${value} (${value})`,
  };
};
