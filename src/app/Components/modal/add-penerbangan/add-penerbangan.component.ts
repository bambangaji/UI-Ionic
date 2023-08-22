import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { IonModal, PopoverController } from '@ionic/angular';
import { HistoryAktivitasComponent } from '../../sidebar/history-aktivitas/history-aktivitas.component';
import { DropdownCustomComponent } from '../../popover/country/country.component';
import { CalendarComponent } from 'ion2-calendar';

@Component({
  selector: 'app-add-penerbangan',
  templateUrl: './add-penerbangan.component.html',
  styleUrls: ['./add-penerbangan.component.scss'],
})
export class AddPenerbanganComponent implements OnInit {
  @Input() idModal: string = '';
  @Input() type: string = 'schedule';
  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild(HistoryAktivitasComponent) historyComponent?: HistoryAktivitasComponent;
  [key: string]: any;
  isJadwal = true;
  showTanggal = false;
  isProject = true;
  data: any;
  today: Date=new Date();
  tanggal: string = '';
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
  constructor(public popoverController: PopoverController,) { }

  ngOnInit() { }
  pickCalendar(data: any) {
    console.log(data);
    this.tanggal = data + "T00:00:00";
    this.showTanggal = false;
  }
  async presentPopover(e: Event, listData: string[], type: string, targetProperty: keyof AddPenerbanganComponent, component: Type<any> = DropdownCustomComponent, size: string = 'cover',) {
    console.log(type);
    // this.popoverController.dismiss();
    const popover = await this.popoverController.create({
      component: component,
      event: e,
      // size: size === 'auto' ? 'auto' : 'cover',
      componentProps: {
        list_data: listData,
        type: type
      },
      cssClass: type === 'calendar' ? 'popover-calendar' : 'my-custom-popover',
      showBackdrop: false
    });
    popover.onDidDismiss().then((result) => {
      if (result.role === 'cancel') {
        console.log('Popover dismissed');
      } else {
        const selectedOption = result.data;
        console.log(`Selected option: ${selectedOption}`);
        console.log(targetProperty);

        this[targetProperty] = selectedOption;
        // Handle the selected option here
      }
    });
    await popover.present();
  }
  async presentPopoverCalendar(e: Event) {
    await this.presentPopover(e, [], 'calendar', 'departed', CalendarComponent, 'auto');
  }
}
