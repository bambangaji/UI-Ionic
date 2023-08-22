import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCustomComponent } from 'src/app/Components/table/table-custom/table-custom.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-schedule-penerbangan',
  templateUrl: './schedule-penerbangan.page.html',
  styleUrls: ['./schedule-penerbangan.page.scss'],
})
export class SchedulePenerbanganPage implements OnInit {

  constructor(private navigationService: NavigationService) { }
  showTooltip: boolean = false;
  showTooltipBerat: boolean = false;
  today: Date = new Date();
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
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
      label: 'TOTAL RESI',
      sort: true,
      width: 150,
    },
    {
      css: '',
      label: 'TOTAL BERAT',
      sort: true,
      width: 150
    },
    {
      css: 'right-header-table',
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
  dataTableSettings = {
    status: true
  }
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
  toggleTooltip() {

  }

  goToCreateManifest() {
    this.navigationService.toCreateManifestPage();
  }

  ngOnInit() {
    this.setTable();
  }
  ionViewDidEnter() {
    this.setTable();
    this.startCountdown();
  }
  startCountdown() {
    const targetTime = new Date();
    targetTime.setDate(targetTime.getDate() + 1);
    targetTime.setHours(targetTime.getHours() + 4);
    targetTime.setMinutes(targetTime.getMinutes() + 22);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        this.days = '00';
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
      } else {
        this.days = this.formatNumber(Math.floor(diff / (1000 * 60 * 60 * 24)));
        this.hours = this.formatNumber(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes = this.formatNumber(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds = this.formatNumber(Math.floor((diff % (1000 * 60)) / 1000));
      }
    }, 1000);
  }
  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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
      total_resi: true,
      print: true,
      detail_manifest_bag: true,
    }, 'manifest')
  }
}
