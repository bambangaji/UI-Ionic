import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateManifestPageRoutingModule } from './create-manifest-routing.module';

import { CreateManifestPage } from './create-manifest.page';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PipesModule } from 'src/app/Pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateManifestPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [CreateManifestPage]
})
export class CreateManifestPageModule {}
