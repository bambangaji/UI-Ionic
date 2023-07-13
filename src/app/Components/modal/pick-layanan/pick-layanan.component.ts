import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ILastmileLastmile } from 'src/app/Interfaces/account_detail.interface';
import { IOption } from 'src/app/Interfaces/index.interface';
import { GlobalService } from 'src/app/Services/global/global.service';
import { RestService } from 'src/app/Services/rest/rest.service';

@Component({
  selector: 'app-pick-layanan',
  templateUrl: './pick-layanan.component.html',
  styleUrls: ['./pick-layanan.component.scss'],
})
export class PickLayananComponent implements OnInit {

  @Input() currentData: any;
  @Input() province: string = '';
  @Input() city: string = '';
  @Input() district: string = '';
  @Input() subdistrict: string = '';
  @Input() idModal: string = ''
  @Input() uuid: string = ''
  listData: any = [];
  lastMile?: ILastmileLastmile;
  search = '';
  value = '';
  discount: number = 0;
  discount_type = 'percent';
  listTypeDiscount: IOption[] = [{
    label: 'IDR',
    value: 'nominal'
  },
  {
    label: '%',
    value: 'percent'
  }
  ]
  @Input() type: string = 'province';
  step: number = 0;
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;

  onChangeValue(value: string): void {
    this.currentData = value;
    this.closeModal();
    this.emitValue();
    console.log(this.currentData);
  }
  constructor(private restService: RestService, public globalService: GlobalService) { }

  ngOnInit() {
    this.getData();
  }
  async getData(uuid: string = '',): Promise<any> {
    // const response = await this.restService.getListLastmile("", false, "?b2b_uuid=" + uuid);
    // this.listData = response.data;
    // return response;
  }
  selectLayanan(data: any): void {
    this.step = 1;
    this.lastMile = data;
    // this.modal?.dismiss();
  }
  async emitValue() {
    this.inputValueChange.emit(this.currentData);
  }
  closeModal() {
    console.log('sss');

    this.modal?.dismiss();
  }
  onValueChange(newValue: any) {
    // this.getData(newValue, this.type);
    // Perform any necessary actions or updates based on the new value
  }
  keypress(event: KeyboardEvent) {
    console.log(event);
  }
  async assignLayanan() {
    if (this.discount_type === 'percent' && this.discount > 100) {
      this.globalService.showToast('Diskon tidak bisa lebih dari 100%', 'danger')
      return
    }
    try {
      const body = {
        uuid: this.uuid,
        lastmile_uid: this.lastMile?.last_mile_uuid,
        discount: parseInt(this.discount.toString()),
        discount_type: this.discount_type,
      };
      // const response = await this.restService.assignLastmile(body);
      // if (!response.data) {
      //   throw response;
      // }
      // this.modal?.dismiss();
      // this.emitValue();
    } catch (error) {
      this.globalService.errorHandler(error, '');
    }
  }
}
