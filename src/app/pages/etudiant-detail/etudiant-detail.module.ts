import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtudiantDetailPageRoutingModule } from './etudiant-detail-routing.module';

import { EtudiantDetailPage } from './etudiant-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtudiantDetailPageRoutingModule
  ],
  declarations: [EtudiantDetailPage]
})
export class EtudiantDetailPageModule {}
