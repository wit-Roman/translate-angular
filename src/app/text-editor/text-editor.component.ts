import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';
import { clearAdv } from '../utils/utils';
import { IOrder } from '../services/http.service.types';

@Component({
  selector: 'text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['./text-editor.component.less'],
  encapsulation: ViewEncapsulation.None,
  // providers: [ToolbarService],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class TextEditorComponent {
  public tools: object = {
    items: [
      'Undo',
      'Redo',
      '|',
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      '|',
      'SubScript',
      'SuperScript',
      '|',
      'LowerCase',
      'UpperCase',
      '|',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'UnorderedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'CreateLink',
      'Image',
      '|',
      'ClearFormat',
      'Print',
      'SourceCode',
      '|',
      'FullScreen',
    ],
  };
  public quickTools: object = {
    image: [
      'Replace',
      'Align',
      'Caption',
      'Remove',
      'InsertLink',
      '-',
      'Display',
      'AltText',
      'Dimension',
    ],
  };

  @ViewChild('defaultRTE')
  container!: RichTextEditorComponent;

  public data?: IOrder;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state as IOrder;
  }

  ngOnInit() {
    clearAdv();
  }
}
