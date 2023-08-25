import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-penerbangan-detail',
  templateUrl: './penerbangan-detail.page.html',
  styleUrls: ['./penerbangan-detail.page.scss'],
})
export class PenerbanganDetailPage implements OnInit {

  listTab = ['Open', 'Close']
  currentTab = this.listTab[0]
  openTooltip = false;
  status: boolean = false;
    today: Date = new Date();
  @ViewChild(TableCustomComponent) tableComponent?: TableCustomComponent;
  listHeaderTabel = [
    {
      css: '',
      label: 'NO.BAG',
      sort: true,
      width: 150
    },
    {
      css: '',
      label: 'TOTAL BERAT',
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
      css: 'right-header-table',
      label: 'DIPERBARUI',
      sort: true,
      width: 300
    },
    // {
    //   css: 'right-header-table',
    //   label: '',
    //   sort: false,
    //   width: 100
    // }
  ]
  dataTable: any[] =
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
        diperbarui: '2023-08-23T00:00:00',
        extend: false,
        data_extend:
          [
            {
              no_redsi: '45326452634',
              total_berat: 10,
              berat: 2,
              berat_2: 2,
              pic: 'toha',
              diperbarui: '2023-08-23T00:00:00',
            },
            {
              no_redsi: '45326452634',
              total_berat: 10,
              berat: 2,
              berat_2: 2,
              pic: 'toha',
              diperbarui: '2023-08-23T00:00:00',
            },
          ]
      },
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
        diperbarui: '2023-08-23T00:00:00',
        extend: false,
        data_extend:
          [
            {
              no_redsi: '45326452634',
              total_berat: 10,
              berat: 2,
              berat_2: 2,
              pic: 'toha',
              diperbarui: '2023-08-23T00:00:00',
            },
            {
              no_redsi: '45326452634',
              total_berat: 10,
              berat: 2,
              berat_2: 2,
              pic: 'toha',
              diperbarui: '2023-08-23T00:00:00',
            },
          ]
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
  tooltipStates: { [key: string]: { [key: string]: boolean } } = {};
  constructor(public navService: NavigationService) { }

  ngOnInit() {
    this.setTable();
  }
  ionViewDidEnter() {
    this.setTable();
  }
  backToPenerbangan() {
    this.navService.toPenerbanganPage();
  }
  widthCol(width?: number, type?: string, name?: string) {
    if (type === 'body') {
      const d = this.listHeaderTabel?.filter((item: any) => item.label === name);
      if (d!.length > 0) {
        width = d![0].width;
      }
    }
    if (!width) {
      return
    }
    return `min-width: ${width}px; max-width: ${width}px !important;`
  }
  toggleTooltip(uuid: any, tooltipKey: string, show: boolean) {
    this.openTooltip = show;
    this.tooltipStates[uuid][tooltipKey] = show;
  }
  setTable() {
    this.tableComponent?.setData(this.listHeaderTabel, this.dataTable, {
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
      print: false,
      detail_manifest_bag: false,
    }, 'manifest')
  }
}
