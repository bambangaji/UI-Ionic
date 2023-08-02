import { Component, Injectable, Input, OnInit, Type, ViewChild } from '@angular/core';

import { IonModal } from '@ionic/angular';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';
import { HistoryAktivitasComponent } from '../../sidebar/history-aktivitas/history-aktivitas.component';
import { GlobalService } from 'src/app/Services/global/global.service';

@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.scss'],
})
export class DetailScheduleComponent implements OnInit {
  @Input() idModal: string = '';
  @Input() type: string = 'schedule';
  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild(HistoryAktivitasComponent) historyComponent?: HistoryAktivitasComponent;
  [key: string]: any;
  isJadwal = true;
  isProject = true;
  data: any;
  listTab = ['Detail', 'Log Aktivitas'];
  @Input() listDetail = [
    {
      name: 'Airlines',
      value: 'Maslindo Airways'
    },
    {
      name: 'MAWB',
      value: '816-01110001'
    },
    {
      name: 'Jenis Pengiriman',
      value: 'Udara'
    },
    {
      name: 'Agent',
      value: 'BSL'
    },
    {
      name: 'Departed',
      value: '2023-01-11, 16:00'
    },
    {
      name: 'Arival',
      value: '2023-01-11, 16:00'
    },
    {
      name: 'Transit In',
      value: '2023-01-11, 16:00'
    },
    {
      name: 'Transit Out',
      value: '2023-01-11, 16:00'
    },
    {
      name: 'Est. Berat',
      value: '20 Kg'
    },
    {
      name: 'Est. Koli',
      value: '100'
    }
  ]
  listDetailProject = [
    {
      name: 'Tanggal Dibuat',
      value: '2023-01-11, 16:00'
    },
    {
      name: 'Dibuat Oleh',
      value: 'Ahmad Alfati',
      class: 'color-blue'
    },
    {
      name: 'Terakhir Diperbarui',
      value: '023-01-11, 16:00'
    },
    {
      name: 'Terakhir Diperbarui Oleh',
      value: 'Ahmad Alfati',
      class: 'color-blue'
    },
  ]
  currentTab: string = 'Detail';
  constructor( public globalService: GlobalService) { }

  ngOnInit() {
    console.log(this.listTab);

  }
  resetData() {
    this.currentTab = 'Detail';
  }
  changeTab(tab: string) {
    this.currentTab = tab;
    console.log('asdsad');
    console.log(this.historyComponent);

    this.historyComponent?.setData(this.data);
  }
  setData(data: any) {
    this.resetData();
    this.data = data;

  }
  getHeight() {
    return this.historyComponent?.setHeight(4);
  }
  setHeight(length: number) {
    const height = 200;
    const total_height = height * length;
    return `height:${total_height}px;`;
  }
  closeModal() {
    // this.globalService.closePopover();
    this.modal?.dismiss()
  }
}
