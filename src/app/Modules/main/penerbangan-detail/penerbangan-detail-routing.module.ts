import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenerbanganDetailPage } from './penerbangan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PenerbanganDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenerbanganDetailPageRoutingModule {}
