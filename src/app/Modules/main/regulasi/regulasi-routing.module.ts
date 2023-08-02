import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegulasiPage } from './regulasi.page';

const routes: Routes = [
  {
    path: '',
    component: RegulasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegulasiPageRoutingModule {}
