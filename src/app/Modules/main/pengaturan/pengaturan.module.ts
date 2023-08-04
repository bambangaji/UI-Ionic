import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengaturanPageRoutingModule } from './pengaturan-routing.module';

import { PengaturanPage } from './pengaturan.page';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengaturanPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PengaturanPage]
})
export class PengaturanPageModule {}
