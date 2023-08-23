import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenerbanganDetailPageRoutingModule } from './penerbangan-detail-routing.module';

import { PenerbanganDetailPage } from './penerbangan-detail.page';
import { PipesModule } from 'src/app/Pipe/pipes.module';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenerbanganDetailPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [PenerbanganDetailPage]
})
export class PenerbanganDetailPageModule {}
