import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowNameComponent } from './show-name/show-name.component';
import { Welcome } from './welcome/welcome.component';
import { PricesComponent } from './prices/prices.component';
import { UserAgeComponent } from './user-age/user-age.component';
import { TranslateComponent } from './translate/translate.component';
import { DocumentEditorComponent } from './document-editor/document-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

const routes: Routes = [
  { path: '', component: ShowNameComponent },
  { path: 'welcome', component: Welcome },
  { path: 'todolist', component: PricesComponent },
  { path: 'age', component: UserAgeComponent },
  { path: 'translate', component: TranslateComponent },
  { path: 'editor', component: DocumentEditorComponent },
  { path: 'text', component: TextEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
