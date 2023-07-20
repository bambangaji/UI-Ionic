import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  },
  {
    path: 'log',
    loadChildren: () => import('../../../Modules/main/schedule/log/log.module').then( m => m.LogPageModule)
  },
  {
    path: 'import',
    loadChildren: () => import('../../../Modules/main/schedule/import/import.module').then( m => m.ImportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
