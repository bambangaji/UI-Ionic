import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportPageRoutingModule } from './import-routing.module';

import { ImportPage } from './import.page';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ImportPage]
})
export class ImportPageModule {}
