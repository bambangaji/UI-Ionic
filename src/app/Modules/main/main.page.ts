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
      title: 'Manifest Studio', url: ERoutePath.SCHEDULE, icon: 'icon-bagging', iconSelected: 'assets/icon/icon-user-selected.svg', isOpen: false, children: [
        { title: 'Daftar Bag', url: ERoutePath.SCHEDULE },
        { title: 'Siap diJadwalkan', url: ERoutePath.LOGIN },
        { title: 'Riwayat', url: ERoutePath.DASHBOARD }
      ]
    },
    { title: 'Regulasi', url: 'regulasi', icon: 'icon-freight', iconSelected: 'assets/icon/icon-home-selected.svg', isOpen: false, children: [] },
   
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
  currentRoute(){
    console.log(this.navigationService.currentRoute);
    return this.navigationService.currentRoute
  }
  goToCreatePesanan() {
    // this.navigationService.toCreateOrderPage();
  }

}
