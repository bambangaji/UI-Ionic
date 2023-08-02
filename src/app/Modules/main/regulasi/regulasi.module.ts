import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegulasiPageRoutingModule } from './regulasi-routing.module';

import { RegulasiPage } from './regulasi.page';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PipesModule } from 'src/app/Pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegulasiPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [RegulasiPage]
})
export class RegulasiPageModule {}
