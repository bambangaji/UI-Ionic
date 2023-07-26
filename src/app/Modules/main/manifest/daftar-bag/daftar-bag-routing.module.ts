import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarBagPage } from './daftar-bag.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarBagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarBagPageRoutingModule {}
