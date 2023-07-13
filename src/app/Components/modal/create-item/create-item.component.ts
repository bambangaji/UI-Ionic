import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IOption } from 'src/app/Interfaces/index.interface';
import { GlobalService } from 'src/app/Services/global/global.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  @Input() currentData: number = 0;
  @Input() listCategory?: IOption[];
  @Input() listUnit?: IOption[] = [];
  @Input() idModal: string = ''
  desc?: string;
  value?: number;
  category?: any;
  listUnit2 = [{ value: 3, label: "Pcs" }];

  unit = this.listUnit2[0];
  qty?: number;
  @Output() inputValueChange = new EventEmitter<any>();
  constructor(private globalService: GlobalService) { }

  ngOnInit() { }

  closeModal() {
    this.modal?.dismiss();
  }
  resetData() {
    this.desc = '';
    this.value = undefined;
    this.qty = undefined;
    this.category = undefined;
    this.unit = this.listUnit2[0];;
  }
  initData(item: any) {
    this.desc = item.desc;
    this.value = item.value;
    this.category = item.category_detail;
    this.unit = item.unit_detail;
    this.qty = item.qty;
  }
  submitForm() {
    console.log(this.desc, this.category, this.value, this.unit, this.qty);
    if (!this.category || !this.desc || !this.unit || !this.qty) {
      this.globalService.showToast("Isi semua form", "danger")
      return
    }
    const item = {
      category_detail: this.category,
      category: this.category.value,
      desc: this.desc,
      unit_detail: this.unit,
      unit: this.unit.value,
      qty: parseInt(this.qty.toString()),
      value:
        this.value,
    }
    this.inputValueChange.emit(item);
    this.modal?.dismiss();
  }
}
