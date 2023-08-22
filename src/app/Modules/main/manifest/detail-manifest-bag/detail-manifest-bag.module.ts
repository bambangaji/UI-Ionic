import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailManifestBagPageRoutingModule } from './detail-manifest-bag-routing.module';

import { DetailManifestBagPage } from './detail-manifest-bag.page';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PipesModule } from 'src/app/Pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailManifestBagPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [DetailManifestBagPage]
})
export class DetailManifestBagPageModule {}
