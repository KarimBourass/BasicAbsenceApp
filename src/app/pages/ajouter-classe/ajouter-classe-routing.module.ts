import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterClassePage } from './ajouter-classe.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterClassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterClassePageRoutingModule {}
