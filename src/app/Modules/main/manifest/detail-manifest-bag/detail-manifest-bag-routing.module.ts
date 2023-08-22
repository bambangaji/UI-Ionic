import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailManifestBagPage } from './detail-manifest-bag.page';

const routes: Routes = [
  {
    path: '',
    component: DetailManifestBagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailManifestBagPageRoutingModule {}
