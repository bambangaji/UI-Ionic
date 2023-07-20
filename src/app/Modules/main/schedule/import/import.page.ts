import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;

  dataheader = [
    {
      css: '',
      label: 'DESTINASI',
      sort: true,
    },
    {
      css: '',
      label: 'MAWB',
      sort: true,
    },
    {
      css: '',
      label: 'AIRLINES',
      sort: true,
    },
    {
      css: '',
      label: 'AGENT',
      sort: true,
    },
    {
      css: '',
      label: 'SCHEDULE',
      sort: true,
      width: 300
    },
    {
      css: '',
      label: 'EST.WEIGHT',
      sort: true,
    },
    {
      css: '',
      label: 'EST.COLLIE',
      sort: true,
    }
    ,
    {
      css: '',
      label: 'DIBUAT',
      sort: true,
    },
    {
      css: 'right-header-table',
      label: 'AKSI',
      sort: false,
    }
  ]
  dataTableSettings = {
    status: true
  }
  dataTable: ISchedule[] =
    [
      {
        agent: 'BSL',
        airlines: 'Interlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '20-09-2022 13:45',
        date_arival: '20-09-2022 13:45',
        collie: 10,
        weight: 100,
        country: 'Singapore',
        created_at: '20-09-2022 13:45',
        vendor: 'HD',
        uuid: '2',
        status: 'Dibandara',
        isStatus: true
      },
      {
        agent: 'BSL',
        airlines: 'Interlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '20-09-2022 13:45',
        date_arival: '20-09-2022 13:45',
        collie: 10,
        weight: 100,
        country: 'Singapore',
        created_at: '20-09-2022 13:45',
        vendor: 'HD',
        uuid: '2',
        status: 'Berangkat',
        isStatus: true
      },
      {
        agent: 'BSL',
        airlines: 'Interlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '20-09-2022 13:45',
        date_arival: '20-09-2022 13:45',
        collie: 10,
        weight: 100,
        country: 'Singapore',
        created_at: '20-09-2022 13:45',
        vendor: 'HD',
        uuid: '2',
        status: 'Selesai',
        isStatus: true
      },
      {
        agent: 'BSL',
        airlines: 'Interlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '20-09-2022 13:45',
        date_arival: '20-09-2022 13:45',
        collie: 10,
        weight: 100,
        country: 'Singapore',
        created_at: '20-09-2022 13:45',
        vendor: 'HD',
        uuid: '2',
        status: 'Dibatalkan',
        isStatus: true
      },
      {
        agent: 'KSL',
        airlines: 'Knterlink Airplane',
        checked: false,
        mawb: '819-00000004',
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/profileDummy.svg',
        date_departed: '24-09-2022 13:45',
        date_arival: '26-09-2022 13:45',
        collie: 12,
        weight: 120,
        country: 'Indonesia',
        created_at: '26-09-2022 13:45',
        vendor: 'SD',
        uuid: '1',
        status: 'Menuju Bandara',
        isStatus: true
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
        status: 'Siap Diangkut',
        isStatus: false
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
        status: 'Dikonfirmasi',
        isStatus: false
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
        status: 'Diajukan',
        isStatus: false
      },
    ]
  constructor() { }

  ngOnInit() {
    this.setTable();
  }
  ionViewDidEnter() {
    this.setTable();
  }
  setTable() {
    this.tableComponent?.setData(this.dataheader, this.dataTable, {
      // status: true,
      detail: false,
      confirm: false,
      checkboxAll: false,
      importData: false,
      exportData: false,
      checkbox: false,
      option: false,
      trash: true
    }, 'schedule-import')
  }
}
