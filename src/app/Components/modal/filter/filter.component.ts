import { Component, Injectable, Input, OnInit, Type, ViewChild } from '@angular/core';

import { IonModal, PopoverController } from '@ionic/angular';
import { DropdownCustomComponent } from '../../popover/country/country.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() idModal: string = '';
  @ViewChild(IonModal) modal?: IonModal;
  [key: string]: any;
  created_at: string = '';
  departed: string = '';
  arival: string = '';
  transit: string = '';
  destinasi: string = '';
  agent: string = '';
  airline: string = '';
  pengiriman: string = '';
  list_pengiriman: any[] = [
    {
      name: 'Via udara',
      isChecked: false,
    },
    {
      name: 'Via laut',
      isChecked: false,
    },
  ]
  constructor(public popoverController: PopoverController) { }

  ngOnInit() { }
  closeModal() {
    this.modal?.dismiss();
  }
  async presentPopover(e: Event, listData: string[], type: string, targetProperty: keyof FilterComponent, component: Type<any> = DropdownCustomComponent, size: string = 'cover', search: boolean = true) {
    const popover = await this.popoverController.create({
      component: component,
      event: e,
      size: size === 'auto' ? 'auto' : 'cover',
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
  async presentPopoverCreate(e: Event) {
    await this.presentPopover(e, [], 'tanggal', 'created_at', DropdownCustomComponent, 'auto', false);
  }
  async presentPopoverDeparted(e: Event) {
    await this.presentPopover(e, [], 'tanggal', 'departed', DropdownCustomComponent, 'auto', false);
  }
  async presentPopoverArival(e: Event) {
    await this.presentPopover(e, [], 'tanggal', 'arival', DropdownCustomComponent, 'auto', false);
  }
  async presentPopoverTransit(e: Event) {
    await this.presentPopover(e, [], 'tanggal', 'transit', DropdownCustomComponent, 'auto', false);
  }
  async presentPopoverDestinasi(e: Event) {
    await this.presentPopover(e, [], 'country', 'destinasi',);
  }
  async presentPopoverAgent(e: Event) {
    await this.presentPopover(e, ['UNIAIR', 'MITRA'], 'normal', 'agent');
  }

  async presentPopoverAirLine(e: Event) {
    await this.presentPopover(e, ['China Airlane', 'Japan Airlane', 'Taiwan Airlane'], 'inisial', 'airline');
  }

  submit() {
    this.closeModal();
  }
}
