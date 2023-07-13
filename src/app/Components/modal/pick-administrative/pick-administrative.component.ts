import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { RestService } from 'src/app/Services/rest/rest.service';

@Component({
  selector: 'app-pick-administrative',
  templateUrl: './pick-administrative.component.html',
  styleUrls: ['./pick-administrative.component.scss'],
})
export class PickAdministrativeComponent implements OnInit {
  @Input() currentData: any;
  @Input() province: string = '';
  @Input() city: string = '';
  @Input() district: string = '';
  @Input() subdistrict: string = '';
  @Input() idModal: string = ''
  listData = [];
  search = '';
  value = '';
  @Input() type: string = 'province';
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;

  onChangeValue(value: string): void {
    this.currentData = value;
    this.closeModal();
    this.emitValue();
  }
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getData('');
  }
  updateData(province: string, city: string, district: string, subdistrict: string): void {
    this.province = province;
    this.city = city;
    this.district = district;
    this.subdistrict = subdistrict;
  }
  async getData(key: string, type: string = 'province'): Promise<any> {
    this.type = type;
    const body = {
      get: type,
      province: this.province,
      city: this.city,
      district: this.district,
      subdistrict: this.subdistrict,
      search: key
    }
    // const response = await this.restService.getListAdministrative(body, false);
    // console.log(response);
    // if (type !== 'postal') {
    //   return this.listData = response.data;
    // }
    // return response.data[0].kodepos;


  }
  selectAddress(id: number): void {
    this.modal?.dismiss();
  }
  async emitValue():Promise<any> {
    this.currentData['type'] = this.type;
    if (this.type === 'subdistrict') {
      this.subdistrict = this.currentData['kelurahan']
      this.currentData['postal'] = await this.getData('', 'postal');
    }
    this.inputValueChange.emit(this.currentData);
    return this.currentData
  }
  closeModal() {
    this.modal?.dismiss();
  }
  onValueChange(newValue: any) {
    this.getData(newValue, this.type);
    // Perform any necessary actions or updates based on the new value
  }
  keypress(event: KeyboardEvent) {
    console.log(event);

  }
}
