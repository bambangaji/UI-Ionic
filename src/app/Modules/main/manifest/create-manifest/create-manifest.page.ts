import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmBagComponent } from 'src/app/Components/modal/confirm-bag/confirm-bag.component';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';

@Component({
  selector: 'app-create-manifest',
  templateUrl: './create-manifest.page.html',
  styleUrls: ['./create-manifest.page.scss'],
})
export class CreateManifestPage implements OnInit {

  constructor() { }
  public today: Date = new Date();
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;
  @ViewChild(ConfirmBagComponent) confirmComponent?: ConfirmBagComponent;

  dataheader = [
    {
      css: '',
      label: 'NO.Resi',
      sort: true,
      width: 200
    },
    {
      css: '',
      label: 'Berat Tertagih',
      sort: true,
      width: 220,
    },
    {
      css: '',
      label: 'komoditas',
      sort: true,
      width: 200,
    },
    {
      css: '',
      label: 'diperbarui',
      sort: true,
      width: 300
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
        initial_vendor: 'BSL',
        country: 'Singapore',
        created_at: '',
        uuid: '222',
        show_column: '6',
        max_column: '10',
        no_resi: '291479274',
        diperbarui: '2023-08-15T06:01:15.854Z',
        berat_tertagih: 4,
        komoditas: 'Garment'
      }
    ]

  ngOnInit() {
    this.setTable();
  }

  ionViewDidEnter() {
    this.setTable();
  }
  back() {

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
      search: false,
      rightSearch: true,
      destinasi: false,
      title: 'Daftar Resi',
      diperbarui: true,
      created_at: false,
      export: false,
      komoditas: true,
      berat_tertagih: true,
      no_resi: true,
      trash_bag: true,
      detail_bag:true
    })
  }
  confirm(){
    this.confirmComponent?.setData("data");
  }
}
