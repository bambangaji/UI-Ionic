import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-penerbangan',
  templateUrl: './penerbangan.page.html',
  styleUrls: ['./penerbangan.page.scss'],
})
export class PenerbanganPage implements OnInit {
  listTab = ['Open', 'Close']
  currentTab = this.listTab[0]
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;
  dataheader = [
    {
      css: '',
      label: 'DESTINASI TUJUAN',
      sort: true,
      width: 200
    },
    {
      css: '',
      label: 'LOADING BAG',
      sort: true,
      width: 400,
    },
    {
      css: '',
      label: 'MAWB',
      sort: true,
      width: 210,
    },
    {
      css: '',
      label: 'TANGGAL TERBANG',
      sort: true,
      width: 200
    },
    {
      css: '',
      label: 'TOTAL BAG',
      sort: true,
      width: 250
    },
    {
      css: 'right-header-table',
      label: 'DIBUAT OLEH ',
      sort: true,
      width: 210
    },
    {
      css: 'right-header-table',
      label: '',
      sort: false,
    }
  ]
  dataTableSettings = {
    status: true
  }
  dataTable: ISchedule[] =
    [
      {
        image_from: 'assets/icon/profileDummy.svg',
        image_to: 'assets/icon/airplane.svg',
        country_image: 'assets/icon/profileDummy.svg',
        initial_vendor: 'BSL',
        country: 'Singapore',
        role: [
          'Export Cleareance Laut',
          'Export Cleareance Udara',
          'Export Cleareance Darat',
          'Export Cleareance Dalam Laut',
          'Export Cleareance Luar Laut',
        ],
        created_at: '20-09-2022 13:45',
        date_flight: '2023-08-15T06:01:15.854Z',
        uuid: '222',
        show_column: '6',
        max_column: '10',
        mawb: '12327362736',
        total_weight: 2000,
        total_bag: 2000,
        est_weight: 1000,
        loading_bag: {
          diangkut: 10,
          dibandara: 10,
          siap_diangkut: 100,
        },
        diperbarui: '2023-08-15T06:01:15.854Z',
        PIC:'Toha'
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
      mawb: true,
      agent: false,
      collie: false,
      weight: false,
      departed: false,
      airlines: false,
      confirm: false,
      exportData: false,
      importData: false,
      checkboxAll: false,
      checkbox: false,
      trash: false,
      print: false,
      loading_bag: true,
      totalBag: true,
      created_at: false,
      date_flight: true,
      total_bag: true,
      diperbarui: true,
      edited: false,
      add_penerbangan: true,
      detail_penerbangan: true,
      option_penerbangan: true,
    })
  }

}
