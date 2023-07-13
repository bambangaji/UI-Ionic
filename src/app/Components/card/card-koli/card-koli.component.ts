import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IOption } from 'src/app/Interfaces/index.interface';
import { CreateItemComponent } from '../../modal/create-item/create-item.component';

@Component({
  selector: 'app-card-koli',
  templateUrl: './card-koli.component.html',
  styleUrls: ['./card-koli.component.scss'],
})
export class CardKoliComponent implements OnInit {
  @ViewChild(CreateItemComponent) itemComponent?: CreateItemComponent;
  listItem = this.dataKoli?.items
  @Input() listCategory?: IOption[];
  @Input() listUnit?: IOption[];
  @Input() isEditCard?: boolean = false;
  @Input() beratBersih?: number;
  @Input() indexCard?: number;
  @Input() dataKoli?: any;
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>;
  berat?: number;
  panjang?: number;
  lebar?: number;
  tinggi?: number;
  isEdit: boolean = false;
  index: number = 0;
  data = {
    weight: 4,
    height: 10,
    width: 10,
    length: 10,
    value: 200000,
    items: this.listItem
  }
  constructor() { }

  ngOnInit() { }

  deleteKoli() {
    this.onDelete.emit(this.indexCard)
  }
  setData(dataCategory: IOption[], dataUnit: IOption[]) {
    this.listCategory = dataCategory;
    this.listUnit = dataUnit;
  }
  createItem(item: any) {
    console.log(item);
    if (this.isEdit) {
      item.index = this.index;
      this.onValueChanged.emit(item);
      return
    }
    this.dataKoli?.items!.push(item);
  }
  deleteItem(item: any, index: number) {
    this.listItem!.splice(index, 1);
  }
  openModalCreateItem() {
    this.isEdit = false;
    this.itemComponent?.resetData();
    this.itemComponent?.modal?.present();
  }
  editModalCreateItem(item: any, index: number) {
    console.log(item);
    this.isEdit = true;
    this.index = index
    this.itemComponent?.initData(item);
    this.itemComponent?.modal?.present();
  }
}
