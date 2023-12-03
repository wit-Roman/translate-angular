import { Component } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'status-component',
  template: `
    <div class="container" *ngIf="visible">
      <div>
        <ul>
          <li *ngFor="let item of items">
            Пользователь:{{ item.Viewer }}_ Ячейка:{{ item.Order_Id
            }}{{ item.Column }}_ Новое значение:{{ item.Value }}
          </li>
        </ul>
        <button
          (click)="setVisible(false); clearItems()"
          style="margin-bottom: 10px"
        >
          Ок
        </button>
      </div>
    </div>
  `,
})
export class StatusBarComponent implements IStatusPanelAngularComp {
  private params!: IStatusPanelParams;
  visible = true;
  items: IItem[] = [];

  agInit(params: IStatusPanelParams): void {
    this.params = params;
  }

  onClick(): void {
    alert('Selected Row Count: ' + this.params.api.getSelectedRows().length);
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  isVisible(): boolean {
    return this.visible;
  }

  pushItem(item: IItem) {
    this.items.push(item);
  }

  clearItems() {
    this.items = [];
  }
}

interface IItem {
  Viewer: string;
  Order_Id?: number;
  Column?: string;
  Value?: string;
  MesType: string;
}

export interface IClickableStatusBar {
  setVisible(visible: boolean): void;
  isVisible(): boolean;
  pushItem(item: IItem): void;
}
