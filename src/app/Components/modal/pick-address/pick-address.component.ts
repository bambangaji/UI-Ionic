import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IAddress, IOption } from 'src/app/Interfaces/index.interface';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.component.html',
  styleUrls: ['./pick-address.component.scss'],
})
export class PickAddressComponent implements OnInit {
  @Input() currentData: string = '0';
  @Input() currentAddress?: IAddress;
  @Input() idModal: string = ''
  @Input()
  listData: IAddress[] = []
  @Output() inputValueChange = new EventEmitter<IAddress>();
  @ViewChild(IonModal) modal?: IonModal;
  onChangeValue(value: IAddress): void {
    this.currentData = value.id;
    this.currentAddress = value;
    this.currentAddress.id = this.idModal;
    // this.modal?.dismiss();
    this.closeModal();
    this.emitValue();
    console.log(this.currentAddress);

  }
  constructor() { }

  ngOnInit() { }
  selectAddress(id: number): void {
    this.modal?.dismiss();
  }
  private emitValue() {
    this.inputValueChange.emit(this.currentAddress);

  }
  closeModal() {
    console.log('sss');

    this.modal?.dismiss();
  }
  setData(data: any, id: string): void {
    this.listData = data;
    this.idModal = id;
  }
}
