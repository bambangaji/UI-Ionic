import { Component, OnInit } from '@angular/core';
import { ERoutePath, NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public appPages = [
    { title: 'Dashboard', url: 'home', icon: 'icon-dashboard', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    { title: 'Schedule', url: ERoutePath.SCHEDULE, icon: 'icon-freight', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    {
      title: 'Manifest Studio', url: ERoutePath.MANIFEST_BAG, icon: 'icon-bagging', iconSelected: 'assets/icon/icon-user-selected.svg', isOpen: false, children: [
        { title: 'Daftar Bag', url: ERoutePath.MANIFEST_BAG },
        { title: 'Siap diJadwalkan', url: ERoutePath.MANIFEST_SCHEDULED },
        { title: 'Riwayat', url: ERoutePath.MANIFEST_HISTORY }
      ]
    },
    { title: 'Regulasi', url: ERoutePath.REGULASI, icon: 'icon-freight', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    { title: 'Loading', url: ERoutePath.PENERBANGAN, icon: 'icon-freight', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    { title: 'Stock', url: ERoutePath.STOCK, icon: 'icon-freight', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    { title: 'Proses Manifest', url: ERoutePath.SCHEDULE_PENERBANGAN, icon: 'icon-freight', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    //settings
    { title: 'Pengaturan', url: ERoutePath.PENGATURAN, icon: 'settings-outline', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
    { title: 'Logout', url: ERoutePath.LOGIN, icon: 'log-out-outline', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
  ];
  public currentUrl: string = ERoutePath.DASHBOARD;
  constructor(public navigationService: NavigationService) { }
  public mouse = false;
  public sideOpen = false;
  ngOnInit() {
    console.log(this.currentUrl);
  }
  ionViewDidEnter() {
  }
  changeMouse() {
    this.mouse = !this.mouse;
  }
  changeSideMenu(data: boolean) {
    this.sideOpen = data;
  }
  changeMenu(data: any) {
    for (let i of this.appPages) {
      i.isOpen = false;
    }
    data.isOpen = true;
    this.currentUrl = data.url;
  }
  currentRoute() {
    console.log(this.navigationService.currentRoute);
    return this.navigationService.currentRoute
  }
  customStyle(data: any) {
    if (data.url === ERoutePath.PENGATURAN) {
      return 'position:absolute; bottom:50px;'
    }
    if (data.url === ERoutePath.LOGIN) {
      return 'position:absolute; bottom:0px; '
    }
    return
  }
  goToCreatePesanan() {
    // this.navigationService.toCreateOrderPage();
  }

}
