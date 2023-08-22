import { Component, OnInit, Input, ViewChild, } from '@angular/core';
import { GlobalService } from 'src/app/Services/global/global.service';
import { HistoryAktivitasComponent } from '../../sidebar/history-aktivitas/history-aktivitas.component';
import { IonModal } from '@ionic/angular';
enum Rarity {
  UltraRare = 'ultraRare',
  SuperRare = 'superRare',
  Rare = 'rare',
  Common = 'common'
}

@Component({
  selector: 'app-notifications-user',
  templateUrl: './notifications-user.component.html',
  styleUrls: ['./notifications-user.component.scss'],
})
export class NotificationsUserComponent implements OnInit {
  pullResults: Record<string, number> = {
    ultraRare: 0,
    superRare: 0,
    rare: 0,
    common: 0
  };

  probabilities: Record<string, any> = {
    ultraRare: 0.002,
    superRare: 0.05,
    rare: 0.15,
    common: 0.798
  };
  @Input() idModal: string = '';
  @Input() type: string = 'schedule';
  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild(HistoryAktivitasComponent) historyComponent?: HistoryAktivitasComponent;
  [key: string]: any;
  isJadwal = true;
  isProject = true;
  data: any;
  listTab = ['Semua', 'Belum Baca']
  currentTab: any = this.listTab[0];
  listNotification =
    [
      {
        image: 'assets/images/profileDummy.svg',
        name: 'Toha',
        status: 'perubahan manifest',
        read: true,
        time: ''
      },
      {
        image: 'assets/images/profileDummy.svg',
        name: 'Buha',
        status: 'perubahan manifest',
        read: true,
        time: ''
      },
      {
        image: 'assets/images/profileDummy.svg',
        name: 'Zoha',
        status: 'perubahan manifest',
        read: false,
        time: ''
      },
      {
        image: 'assets/images/profileDummy.svg',
        name: 'Koha',
        status: 'perubahan manifest',
        read: false,
        time: ''
      },
      {
        image: 'assets/images/profileDummy.svg',
        name: 'Koha',
        status: 'perubahan manifest',
        read: false,
        time: ''
      },
    ];
  public list_bag: any[] =
    [
      {
        nama_barang: 'Atasan Wanita',
        nilai_barang: '1200000',
        qty: '10',
        berat: '10'
      },
      {
        nama_barang: 'Atasan Wanita',
        nilai_barang: '1200000',
        qty: '10',
        berat: '10'
      },
    ]
  constructor(public globalService: GlobalService) { }

  ngOnInit() { }
  performGachaPulls(numPulls: number) {
    this.resetResults();

    for (let i = 0; i < numPulls; i++) {
      const rarity = this.gachaPull();
      this.pullResults[rarity]++;
    }
  }
  private gachaPull(): Rarity {
    const randomNumber = Math.random();
    let accumulatedProbability = 0;

    for (const rarity in this.probabilities) {
      accumulatedProbability += this.probabilities[rarity];

      if (randomNumber < accumulatedProbability) {
        return rarity as Rarity;
      }
    }

    return Rarity.Common;
  }

  // Simulate multiple gacha pulls
  simulatePulls(numPulls: number) {
    const results = {
      ultraRare: 0,
      superRare: 0,
      rare: 0,
      common: 0
    };

    for (let i = 0; i < numPulls; i++) {
      const rarity = this.gachaPull();
      results[rarity]++;
    }

    return results;
  }
  private resetResults() {
    for (const rarity in this.pullResults) {
      this.pullResults[rarity] = 0;
    }
  }
  resetData() {
  }
  setData(data: any) {
    this.resetData();
    this.data = data;
    this.modal?.present();
  }

  closeModal() {
    // this.globalService.closePopover();
    this.modal?.dismiss()
  }

}
