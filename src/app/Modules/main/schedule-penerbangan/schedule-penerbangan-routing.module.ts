import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePenerbanganPage } from './schedule-penerbangan.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePenerbanganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePenerbanganPageRoutingModule {}
