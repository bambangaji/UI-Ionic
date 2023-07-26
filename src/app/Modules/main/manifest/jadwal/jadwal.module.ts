import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JadwalPageRoutingModule } from './jadwal-routing.module';

import { JadwalPage } from './jadwal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JadwalPageRoutingModule
  ],
  declarations: [JadwalPage]
})
export class JadwalPageModule {}
