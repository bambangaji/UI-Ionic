import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenerbanganPageRoutingModule } from './penerbangan-routing.module';

import { PenerbanganPage } from './penerbangan.page';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenerbanganPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PenerbanganPage]
})
export class PenerbanganPageModule {}
