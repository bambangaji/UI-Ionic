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
