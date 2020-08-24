import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AjouterClassePageRoutingModule } from './ajouter-classe-routing.module';

import { AjouterClassePage } from './ajouter-classe.page';

import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterClassePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterClassePage]
})
export class AjouterClassePageModule {}
