import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiwayatPageRoutingModule } from './riwayat-routing.module';

import { RiwayatPage } from './riwayat.page';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PipesModule } from 'src/app/Pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiwayatPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [RiwayatPage]
})
export class RiwayatPageModule {}
