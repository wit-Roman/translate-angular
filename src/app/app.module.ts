import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AgGridModule } from 'ag-grid-angular';
import { DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowNameComponent } from './show-name/show-name.component';
import { Welcome } from './welcome/welcome.component';
import { PricesComponent } from './prices/prices.component';
import { UserAgeComponent } from './user-age/user-age.component';
import { TranslateComponent } from './translate/translate.component';
import { DocumentEditorComponent } from './document-editor/document-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowNameComponent,
    Welcome,
    PricesComponent,
    UserAgeComponent,
    TranslateComponent,
    DocumentEditorComponent,
    TextEditorComponent,
    StatusBarComponent,
  ],
  imports: [
    AgGridModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DocumentEditorContainerModule,
    RichTextEditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
