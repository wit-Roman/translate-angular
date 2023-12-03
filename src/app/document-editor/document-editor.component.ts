import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ToolbarService,
  DocumentEditorContainerComponent,
} from '@syncfusion/ej2-angular-documenteditor';

import { clearAdv } from '../utils/utils';
import { TitleBar } from './title-bar';
import { IOrder } from '../services/http.service.types';

/**
 * Document Editor Component
 */
@Component({
  selector: 'document-editor',
  templateUrl: 'document-editor.component.html',
  styleUrls: ['./document-editor.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarService],
})
export class DocumentEditorComponent {
  private titleBar!: TitleBar;
  public data?: IOrder;
  public documentTitle = '';

  @ViewChild('documenteditor_default')
  container!: DocumentEditorContainerComponent;
  @ViewChild('default_title_bar') titleBarRef!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state as IOrder;
  }

  onCreate() {
    //this.container.documentEditor.open(JSON.stringify(chartDocument));
    // this.container.documentEditor.documentName = 'Product Report';

    this.titleBar = new TitleBar(
      this.titleBarRef.nativeElement,
      this.container.documentEditor,
      true
    );

    if (this.data) {
      this.openDocument();
      this.documentTitle = this.data.Order_id + ' | ' + this.data.Order_name;
    }
  }

  onDocumentChange() {
    this.container.documentEditor.focusIn();
  }

  ngOnInit() {
    clearAdv();
  }

  openDocument() {
    if (!this.data) return;

    console.log(
      'openDocument',
      this.data,
      this.data.Order_id + ' | ' + this.data.Order_name
    );

    this.container.documentEditor.open(
      JSON.stringify({ sfdt: this.data.Text })
    );
  }
}
