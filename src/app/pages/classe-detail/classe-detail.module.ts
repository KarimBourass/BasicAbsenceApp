import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasseDetailPageRoutingModule } from './classe-detail-routing.module';

import { ClasseDetailPage } from './classe-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasseDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClasseDetailPage]
})
export class ClasseDetailPageModule {}
