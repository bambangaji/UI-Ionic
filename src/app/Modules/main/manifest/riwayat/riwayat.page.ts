import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
})
export class RiwayatPage implements OnInit {
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;

  dataheader = [
    {
      css: '',
      label: 'DESTINASI',
      sort: true,
      width: 220
    },
    {
      css: '',
      label: 'MAWB',
      sort: true,
    },
    {
      css: '',
      label: 'BAG RANGE',
      sort: true,
    },
    {
      css: '',
      label: 'TOT BAG',
      sort: true,
    },
    {
      css: '',
      label: 'TOT KOLI',
      sort: true,
    },
    {
      css: '',
      label: 'DIBUAT',
      sort: true,
    },
    {
      css: '',
      label: 'STATUS JADWAL',
      sort: true,
    }
    ,
    {
      css: 'right-header-table',
      label: 'AKSI',
      sort: false,
    },
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
        uuid: '222',
        status: 'Dibandara',
        isStatus: true,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '1222',
        status: 'Berangkat',
        isStatus: true,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '1232',
        status: 'Selesai',
        isStatus: true,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '3232',
        status: 'Dibatalkan',
        isStatus: true,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '3231',
        status: 'Menuju Bandara',
        isStatus: true,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '34353',
        status: 'Siap Diangkut',
        isStatus: false,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '4365',
        status: 'Dikonfirmasi',
        isStatus: false,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'
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
        uuid: '34235',
        status: 'Diajukan',
        isStatus: false,
        bag_range: '100-1000',
        total_bag: '100',
        total_collie:'200'  
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
      status: true,
      detail: false,
      confirm: false,
      checkboxAll: false,
      importData: false,
      exportData: false,
      checkbox: false,
      trash: false,
      agent: false,
      airlines: false,
      bagRanges: true,
      mawb: true,
      collie: false,
      option: false,
      optionRiwayat: true,
      totalBag: true,
      totalCollie: true,
      weight: false,
      departed: false,
      print: true,

    })
  }

}
