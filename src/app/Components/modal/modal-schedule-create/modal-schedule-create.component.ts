import { Component, Injectable, Input, OnInit, Type, ViewChild } from '@angular/core';
import { IonModal, PopoverController } from '@ionic/angular';
import { DropdownCustomComponent } from '../../popover/country/country.component';
import { GlobalService } from 'src/app/Services/global/global.service';
import { BehaviorSubject } from 'rxjs';
import { CalendarComponent } from '../../popover/calendar/calendar.component';
import { TimeComponent } from '../../popover/time/time.component';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-modal-schedule-create',
  templateUrl: './modal-schedule-create.component.html',
  styleUrls: ['./modal-schedule-create.component.scss'],
})
export class ModalScheduleCreateComponent implements OnInit {

  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild(DropdownCustomComponent) DropdownCustomComponent?: DropdownCustomComponent;
  @Input() idModal: string = '';
  country: string = '';
  agent: string = '';
  airline: string = '';
  pengiriman: string = '';
  departed: string = '';
  arival: string = '';
  transit: string = '';
  departed_time: string = '';
  arival_time: string = '';
  transit_time: string = '';
  koli: string = '';
  weights: string = '';
  [key: string]: any;
  showDropdownCountry: boolean = false;
  private dataSubject = new BehaviorSubject<string[]>([]);
  data$ = this.dataSubject.asObservable();
  constructor(public popoverController: PopoverController, private globalService: GlobalService) { }
  popover?: HTMLIonPopoverElement;
  ngOnInit() { }
  selectCountry(value: string) {
    this.country = '34783264';
  }
  async presentPopover(e: Event, listData: string[], type: string, targetProperty: keyof ModalScheduleCreateComponent, component: Type<any> = DropdownCustomComponent, size: string = 'cover',) {
    const popover = await this.popoverController.create({
      component: component,
      event: e,
      size: size === 'auto' ? 'auto' : 'cover',
      componentProps: {
        list_data: listData,
        type: type
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
  async presentPopoverCountry(e: Event) {
    await this.presentPopover(e, [], 'country', 'country');
  }

  async presentPopoverPengiriman(e: Event) {
    await this.presentPopover(e, ['Udara', 'Laut', 'Darat'], 'normal', 'pengiriman');
  }

  async presentPopoverAgent(e: Event) {
    await this.presentPopover(e, ['UNIAIR', 'MITRA'], 'normal', 'agent');
  }

  async presentPopoverAirLine(e: Event) {
    await this.presentPopover(e, ['China Airlane', 'Japan Airlane', 'Taiwan Airlane'], 'inisial', 'airline');
  }

  async presentPopoverCalendar(e: Event) {
    await this.presentPopover(e, [], 'inisial', 'departed', CalendarComponent,'auto');
  }

  async presentPopoverTime(e: Event) {
    await this.presentPopover(e, [], 'inisial', 'departed_time', TimeComponent, 'auto');
  }
  async presentPopoverArival(e: Event) {
    await this.presentPopover(e, [], 'inisial', 'arival', CalendarComponent,'auto');
  }

  async presentPopoverArivalTime(e: Event) {
    await this.presentPopover(e, [], 'inisial', 'arival_time', TimeComponent, 'auto');
  }
  async presentPopoverTransit(e: Event) {
    await this.presentPopover(e, [], 'inisial', 'transit', CalendarComponent,'auto');
  }

  async presentPopoverTransitTime(e: Event) {
    await this.presentPopover(e, [], 'inisial', 'transit_time', TimeComponent, 'auto');
  }
  closeModal(){
    this.globalService.closePopover();
    this.modal?.dismiss();
  }
  submit(){
    console.log('submit');
    
  }
}
