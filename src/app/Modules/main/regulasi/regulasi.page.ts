import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-regulasi',
  templateUrl: './regulasi.page.html',
  styleUrls: ['./regulasi.page.scss'],
})
export class RegulasiPage implements OnInit {
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;

  dataheader = [
    {
      css: '',
      label: 'DESTINASI',
      sort: true,
      width: 200
    },
    {
      css: '',
      label: 'INISIAL VENDOR',
      sort: true,
      width: 220,
    },
    {
      css: '',
      label: 'ROLE',
      sort: true,
      width: 400,
    },
    {
      css: '',
      label: 'MENAMPILKAN',
      sort: true,
      width: 400
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
        country_image: 'assets/icon/profileDummy.svg',
        initialVendor: 'BSL',
        country: 'Singapore',
        role: [
          'Export Cleareance Laut',
          'Export Cleareance Udara',
          'Export Cleareance Darat',
          'Export Cleareance Dalam Laut',
          'Export Cleareance Luar Laut',
        ],
        created_at: '20-09-2022 13:45',
        uuid: '222',
        show_column: '6',
        max_column: '10'
      },
      {
        country_image: 'assets/icon/profileDummy.svg',
        initialVendor: 'BSL',
        country: 'Zingapore',
        role: [
          'Export Cleareance Laut',
          'Export Cleareance Udara',
          'Export Cleareance Darat',
          'Export Cleareance Dalam Laut',
          'Export Cleareance Luar Laut',
        ],
        created_at: '20-09-2022 13:45',
        uuid: '222',
        show_column: '6',
        max_column: '10'
      },
      {
        country_image: 'assets/icon/profileDummy.svg',
        initialVendor: 'BSL',
        country: 'ringapore',
        role: [
          'Export Cleareance Laut',
          'Export Cleareance Udara',
          'Export Cleareance Darat',
          'Export Cleareance Dalam Laut',
          'Export Cleareance Luar Laut',
        ],
        created_at: '20-09-2022 13:45',
        uuid: '222',
        show_column: '6',
        max_column: '10'
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
      mawb: false,
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

    }, 'regulasi')
  }

}
