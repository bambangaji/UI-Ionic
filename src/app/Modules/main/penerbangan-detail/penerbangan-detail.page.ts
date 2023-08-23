import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-penerbangan-detail',
  templateUrl: './penerbangan-detail.page.html',
  styleUrls: ['./penerbangan-detail.page.scss'],
})
export class PenerbanganDetailPage implements OnInit {

  listTab = ['Open', 'Close']
  currentTab = this.listTab[0]
  today: Date = new Date();
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;
  dataheader = [
    {
      css: '',
      label: 'NO.BAG',
      sort: true,
      width: 150
    },
    {
      css: '',
      label: 'LOADING BAG',
      sort: true,
      width: 200,
    },
    {
      css: '',
      label: 'TOTAL BERAT',
      sort: true,
      width: 150
    },
    {
      css: '',
      label: 'DIPERBARUI',
      sort: true,
      // width: 300
    },
    {
      css: 'right-header-table',
      label: '',
      sort: false,
      width: 100
    }
  ]
  dataTable: ISchedule[] =
    [
      {
        country_image: 'assets/icon/profileDummy.svg',
        initial_vendor: 'BSL',
        country: 'Singapore',
        created_at: '20-09-2022 13:45',
        uuid: '222',
        show_column: '6',
        max_column: '10',
        mawb: '2325542542',
        no_bag: '234234244',
        loading_bag: {
          diangkut: 0,
          dibandara: 0,
          siap_diangkut: 100
        },
        total_resi: 5,
        total_weight: 100,
        PIC: 'Ahmad',
        diperbarui: '2023-08-23T00:00:00'
      },
    ]
  listDataManifest =
    [
      {
        image: 'assets/icon/profileDummy.svg',
        country: 'Singapore',
        vendor: 'HD',
        status: 'Open'
      },
      {
        image: 'assets/icon/profileDummy.svg',
        country: 'Brazil',
        vendor: 'HD2',
        status: 'Close'
      },
      {
        image: 'assets/icon/profileDummy.svg',
        country: 'japan',
        vendor: 'HD3',
        status: 'Open'
      },
      {
        image: 'assets/icon/profileDummy.svg',
        country: 'Spanyol',
        vendor: 'HD4',
        status: 'Open'
      },
      {
        image: 'assets/icon/profileDummy.svg',
        country: 'Indonesia',
        vendor: 'HD5',
        status: 'Open'
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
      search: true,
      destinasi: false,
      loading_bag: true,
      no_bag: true,
      created_at: false,
      diperbarui: true,
      total_weight: true,
      total_resi: false,
      print: true,
      detail_manifest_bag: true,
    }, 'manifest')
  }
}
