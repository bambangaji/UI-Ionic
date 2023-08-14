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
      // width: 200
    },
    {
      css: '',
      label: 'MAWB',
      sort: true,
      // width: 220,
    },
    {
      css: '',
      label: 'AIRLINES',
      sort: true,
      // width: 400,
    },
    {
      css: '',
      label: 'TOTAL BAG',
      sort: true,
      // width: 400
    },
    {
      css: '',
      label: 'TOTAL BERAT',
      sort: true,
      // width: 400
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
  dataTable: ISchedule[] = []
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
      trash: true,
      print:true,
    })
  }

}
