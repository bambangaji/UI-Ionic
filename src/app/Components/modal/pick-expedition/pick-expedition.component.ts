import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IAddress } from 'src/app/Interfaces/address.interface';
import { GlobalService } from 'src/app/Services/global/global.service';

@Component({
  selector: 'app-pick-expedition',
  templateUrl: './pick-expedition.component.html',
  styleUrls: ['./pick-expedition.component.scss'],
})
export class PickExpeditionComponent implements OnInit {
  @Input() currentData: string = '0';
  @Input() currentAddress?: IAddress;
  @Input() idModal: string = ''
  @Input()
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;
  dataValidation?: any;
  listData: any[] = [];
  listRegular: any[] = [];
  listNextday: any[] = [];
  listSameday: any[] = [];
  listCargo: any[] = [];
  listDocument: any[] = [];
  onChangeValue(value: IAddress): void {
    this.currentData = value.id;
    this.currentAddress = value;
    this.modal?.dismiss();
    this.emitValue();
    console.log(this.currentData);
  }
  selectItem(item: any, serviceType: string) {
    const data = {
      service_type: serviceType,
      last_mile_code: item.last_mile_code,
      last_mile_name: item.last_mile_name,
      selected_price: item.price_id,
      sla: item.data.sla.sum
    }
    this.inputValueChange.emit(data);
    this.modal?.dismiss();
  }
  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    this.listData = [
      {
        id: '12',
        name: 'Expedition 1',
        service: [
          { id: '1', name: 'Service 1', price: 20000 },
          { id: '2', name: 'Ekonomis (1-2 Jam)', price: 20000 },
          { id: '3', name: 'Service 3', price: 20000 },
          { id: '2', name: 'Service 2', price: 20000 },
          { id: '3', name: 'Service 3', price: 20000 },
        ]
      },
      {
        id: '14',
        name: 'Expedition 2',
        service: [
          { id: '1', name: 'Service 1' },
          { id: '2', name: 'Service 2' },
          { id: '3', name: 'Service 3' },
        ]
      },

    ]
  }
  selectAddress(id: number): void {
    this.modal?.dismiss();
  }
  setData(data: any) {
    this.listRegular = data.Regular;
    this.listCargo = data.Cargo;
    this.listDocument = data.Document;
    this.listNextday = data.Nextday;
    this.listSameday = data.Sameday;
  }
  private emitValue() {
    this.inputValueChange.emit();
  }
  closeModal() {
    this.modal?.dismiss();
  }
  initData(data: any) {
    this.dataValidation = data;
  }
}
