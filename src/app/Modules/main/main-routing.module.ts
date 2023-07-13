import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: '',
        redirectTo: '/main/dashboard/home',
        pathMatch: 'full',
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule)
      },
      // Define additional child routes here
    ]
  },
  {
    path: '',
    redirectTo: '/main/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'schedule',
    loadChildren: () => import('../../Modules/main/schedule/schedule.module').then(m => m.SchedulePageModule)
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
