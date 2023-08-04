import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
})
export class PengaturanPage implements OnInit {
  public listTab = ['Profil', 'Ubah Kata Sandi'];
  public currentTab = this.listTab[0];
  constructor() { }

  ngOnInit() {
  }

}
