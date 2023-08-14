import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePenerbanganPageRoutingModule } from './schedule-penerbangan-routing.module';

import { SchedulePenerbanganPage } from './schedule-penerbangan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePenerbanganPageRoutingModule
  ],
  declarations: [SchedulePenerbanganPage]
})
export class SchedulePenerbanganPageModule {}
