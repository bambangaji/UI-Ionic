import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePenerbanganPageRoutingModule } from './schedule-penerbangan-routing.module';

import { SchedulePenerbanganPage } from './schedule-penerbangan.page';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PipesModule } from 'src/app/Pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePenerbanganPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [SchedulePenerbanganPage]
})
export class SchedulePenerbanganPageModule {}
