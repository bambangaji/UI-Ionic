import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;

  listTab = ["Daftar Jadwal", "Dalam Proses", "Berangkat", "Sampai", "Dibatalkan"]
  currentTab = "Daftar Jadwal";
  dataheader = [
    {
      css: '',
      label: 'Destinasi',
      sort: true,
      sortASC: true,
    },
    {
      css: '',
      label: 'MAWB',
      sort: true,
      sortASC: true,
    },
    {
      css: '',
      label: 'AIRLINES',
      sort: true,
      sortASC: true,
    },
    {
      css: '',
      label: 'No.Flight',
      sort: true,
      sortASC: true,
    },
    {
      css: '',
      label: 'AGENT',
      sort: true,
      sortASC: true,
    },
    {
      css: '',
      label: 'SCHEDULE',
      sort: true,
      width: 300,
      sortASC: true,
    },
    {
      css: '',
      label: 'EST.BAG',
      sort: true,
      sortASC: true,
    },
    {
      css: '',
      label: 'EST.WEIGHT',
      sort: true,
      sortASC: true,
    }
    // {
    //   css: '',
    //   label: 'EST.COLLIE',
    //   sort: true,
    //   sortASC: true,
    // }
    ,
    {
      css: '',
      label: 'DIBUAT',
      sort: true,
      sortASC: true,
    },
    {
      css: 'right-header-table',
      label: 'AKSI',
      sort: false,
      sortASC: true,
    }
  ]
  dataTable: ISchedule[] =
    [
      {
        agent: 'BSL',
        airlines: 'Interlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '20-09-2023 13:45',
        date_arival: '20-09-2023 13:45',
        collie: 10,
        weight: 100,
        country: 'Singapore',
        created_at: '20-09-2022 13:45',
        vendor: 'HD',
        uuid: '2',
        status: 'Terbang',
        isStatus: false,
        no_flight: '222',
        bag: 20,
        est_bag: 100,
        est_weight: 1000,
      },
      {
        agent: 'KSL',
        airlines: 'Knterlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '24-09-2023 13:45',
        date_arival: '26-09-2023 13:45',
        collie: 12,
        weight: 120,
        country: 'Indonesia',
        created_at: '26-09-2022 13:45',
        vendor: 'SD',
        uuid: '1',
        status: 'Terbang',
        isStatus: false,
        no_flight: '223',
        bag: 10,
        est_bag: 100,
        est_weight: 1000,
      },
      {
        agent: 'DSL',
        airlines: 'Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '25-09-2022 13:45',
        date_arival: '24-09-2022 13:45',
        collie: 1,
        weight: 140,
        country: 'Taiwan',
        created_at: '25-09-2022 13:45',
        vendor: 'ED',
        uuid: '3',
        status: 'Terbang',
        isStatus: false,
        no_flight: '225',
        bag: 120,
        est_bag: 150,
        est_weight: 1000,
      },
      {
        agent: 'zSL',
        airlines: 'KLSKDLAKL Airplane',
        checked: false,
        mawb: '219-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '22-09-2022 13:45',
        date_arival: '24-09-2022 13:45',
        collie: 29,
        weight: 150,
        country: 'China',
        created_at: '23-09-2022 13:45',
        vendor: 'MD',
        uuid: '5',
        status: 'Terbang',
        isStatus: false,
        no_flight: '2220',
        bag: 50,
        est_bag: 200,
        est_weight: 1000,
      },
    ]
  ngOnInit() {
    this.setTable();
  }
  ionViewDidEnter() {
    this.setTable();
  }
  changeTab(tab: string) {

    this.currentTab = tab;
    this.setTable();
  }
  setTable() {
    // this.tableComponent?.setSettingsTable()
    if (this.currentTab === 'Daftar Jadwal') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { import: true, bag: true, collie: false, noFlight: true, checkbox: true, importData: true, confirm: false, option: true, optionChangeVendor: true, optionDetail: true, optionChange: true, optionDelete: true, checkboxAll: true });
    }
    if (this.currentTab === 'Dalam Proses') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { ready: true, estBag: true, estWeight: true, bag: true, collie: false, noFlight: true, checkbox: true, importData: false, confirm: false, option: true, optionChangeVendor: false, optionDetail: true, optionChange: false, optionDelete: false, checkboxAll: true });
    }
    if (this.currentTab === 'Menuju Bandara') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { bag: true, collie: false, noFlight: true, checkbox: true, importData: false, confirm: false, option: true, optionChangeVendor: false, optionDetail: true, optionChange: false, optionDelete: false, checkboxAll: true });
    }
    if (this.currentTab === 'Dibandara') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { bag: true, collie: false, noFlight: true, checkbox: true, importData: false, confirm: false, option: true, optionChangeVendor: true, optionDetail: true, optionChange: true, optionDelete: true, checkboxAll: true });
    }
    if (this.currentTab === 'Berangkat') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { estBag: true, estWeight: true, bag: true, collie: false, noFlight: true, complete: true, checkbox: true, importData: false, confirm: false, option: true, optionChangeVendor: false, optionDetail: true, optionChange: false, optionDelete: false, checkboxAll: true });
    }
    if (this.currentTab === 'Sampai') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { estBag: true, estWeight: true, bag: true, collie: false, noFlight: true, checkbox: true, importData: false, confirm: false, option: true, optionChangeVendor: false, optionDetail: true, optionChange: false, optionDelete: false, checkboxAll: true });
    }
    if (this.currentTab === 'Dibatalkan') {
      return this.tableComponent?.setData(this.dataheader, this.dataTable, { estBag: true, estWeight: true, bag: true, collie: false, noFlight: true, checkbox: true, exportData: false, importData: false, confirm: false, option: true, optionChangeVendor: false, optionDetail: true, optionChange: false, optionDelete: false, checkboxAll: false });
    }
    return this.tableComponent?.setData(this.dataheader, this.dataTable, { bag: true, collie: false, estBag: true, estWeight: true, noFlight: true, confirm: true, importData: false, option: true, optionDetail: true, optionChange: true, optionDelete: true, checkboxAll: true });
  }
}
