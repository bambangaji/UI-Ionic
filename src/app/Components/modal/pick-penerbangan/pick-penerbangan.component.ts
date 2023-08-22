import { Component, Injectable, Input, OnInit, Type, ViewChild } from '@angular/core';
import { IonModal, PopoverController } from '@ionic/angular';
import { DropdownCustomComponent } from '../../popover/country/country.component';
import { GlobalService } from 'src/app/Services/global/global.service';
import { BehaviorSubject } from 'rxjs';
import { CalendarComponent } from '../../popover/calendar/calendar.component';
import { TimeComponent } from '../../popover/time/time.component';

@Component({
  selector: 'app-pick-penerbangan',
  templateUrl: './pick-penerbangan.component.html',
  styleUrls: ['./pick-penerbangan.component.scss'],
})
export class PickPenerbanganComponent implements OnInit {
  @Input() idModal: string = '';
  @Input() type: string = 'schedule';
  @ViewChild(IonModal) modal?: IonModal;
  [key: string]: any;
  isJadwal = true;
  showTanggal = false;
  isProject = true;
  data: any;
  today: Date = new Date();
  tanggal: string = '';
  vendor: string = '';
  berat: string = '';
  constructor(public popoverController: PopoverController,) { }

  ngOnInit() { }
  pickCalendar(data: any) {
    console.log(data);
    this.tanggal = data + "T00:00:00";
    this.showTanggal = false;
  }
  async presentPopover(e: Event, listData: string[], type: string, targetProperty: keyof PickPenerbanganComponent, component: Type<any> = DropdownCustomComponent, size: string = 'cover', search: boolean = true) {
    const popover = await this.popoverController.create({
      component: component,
      event: e,
      size: size === 'auto' ? 'auto' : 'cover',
      alignment: 'end',
      componentProps: {
        list_data: listData,
        type: type,
        search: search,
      },
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
  async presentPopoverVendor(e: Event) {
    await this.presentPopover(e, ['UNIAIR', 'MITRA'], 'normal', 'vendor',);
  }
  confirm(){
    this.modal?.dismiss();
  }
}
