import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JadwalPageRoutingModule } from './jadwal-routing.module';

import { JadwalPage } from './jadwal.page';
import { PipesModule } from 'src/app/Pipe/pipes.module';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JadwalPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [JadwalPage]
})
export class JadwalPageModule {}
