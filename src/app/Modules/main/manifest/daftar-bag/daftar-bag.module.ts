import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarBagPageRoutingModule } from './daftar-bag-routing.module';

import { DaftarBagPage } from './daftar-bag.page';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PipesModule } from 'src/app/Pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarBagPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [DaftarBagPage]
})
export class DaftarBagPageModule {}
