import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  listTab = ['Vendor HD', 'Vendor MINA']
  currentTab = this.listTab[0]
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;

  dataheader = [
    {
      css: '',
      label: 'BAG RANGE',
      sort: true,
      width: 220
    },
    {
      css: '',
      label: 'INFO BAG',
      sort: true,
      width: 300,
    },
    {
      css: '',
      label: 'DIPERBARUI',
      sort: true,
      width: 300,
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
  dataTable: ISchedule[] = [
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
      bag_send: 10,
      total_bag: 100,
      bag_range: '1000-9000',
      PIC: 'Toha',
      diperbarui: '2023-08-15T06:01:15.854Z'
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
      bagRanges: true,
      destinasi: false,
      infoBag: true,
      trash: true,
      print: true,
      created_at: false,
      diperbarui: true,
    },
      'stock'
    )
  }
}
