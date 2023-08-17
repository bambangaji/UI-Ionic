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
      {
        path: 'regulasi',
        loadChildren: () => import('./regulasi/regulasi.module').then(m => m.RegulasiPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pengaturan/pengaturan.module').then(m => m.PengaturanPageModule)
      },
      {
        path: 'penerbangan',
        loadChildren: () => import('../../Modules/main/penerbangan/penerbangan.module').then(m => m.PenerbanganPageModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('../../Modules/main/stock/stock.module').then(m => m.StockPageModule)
      },
      {
        path: 'schedule-penerbangan',
        loadChildren: () => import('../../Modules/main/schedule-penerbangan/schedule-penerbangan.module').then(m => m.SchedulePenerbanganPageModule)
      },
      {
        path: 'manifest',
        children: [
          {
            path: 'bag',
            loadChildren: () => import('./manifest/daftar-bag/daftar-bag.module').then(m => m.DaftarBagPageModule)
          },
          {
            path: 'scheduled',
            loadChildren: () => import('./manifest/jadwal/jadwal.module').then(m => m.JadwalPageModule)
          },
          {
            path: 'history',
            loadChildren: () => import('./manifest/riwayat/riwayat.module').then(m => m.RiwayatPageModule)
          },
          {
            path: 'create-manifest',
            loadChildren: () => import('../../Modules/main/manifest/create-manifest/create-manifest.module').then(m => m.CreateManifestPageModule)
          },
          {
            path: '',
            redirectTo: '/main/dashboard/manifest/bag',
            pathMatch: 'full',
          },
        ]
      },
      // Define additional child routes here
    ]
  },
  {
    path: '',
    redirectTo: '/main/dashboard',
    pathMatch: 'full',
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
