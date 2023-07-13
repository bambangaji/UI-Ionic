import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { GlobalService } from 'src/app/Services/global/global.service';
import { COUNTRIES_EXT } from 'src/app/Services/global/list-country';
export interface IOption {
  label: string,
  value: string | number,
}
@Component({
  selector: 'app-dropdown-flag',
  templateUrl: './dropdown-flag.component.html',
  styleUrls: ['./dropdown-flag.component.scss'],
})

export class DropdownFlagComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() isReadonly: boolean = false;
  @ViewChild(IonModal) modal?: IonModal;
  @Output() valueChange = new EventEmitter<string>();
  selectedOption = "action";
  openFlag = false;
  phoneCountry = { code: 'ID', ext: '+62', country: 'Indonesia' };
  listCountry: { code: string; country: string; ext: string; }[] | undefined;
  constructor(public globalService: GlobalService, public elementRef: ElementRef) { }

  ngOnInit() {
    this.listCountry = COUNTRIES_EXT.sort((a, b) => a.country.localeCompare(b.country));;
    // this.phoneCountry = this.listCountry.filter(country => country.code === 'ID');
  }

  selectCountry(country: any): void {
    this.phoneCountry = country;
    this.valueChange.emit(country.ext);
    this.closeModal();
    // this.onValueChange()
  }
  closeModal() {
    this.modal?.dismiss();
  }
  openModal() {
    console.log(this.isReadonly);
    // let id = '#openModal'
    if (!this.isReadonly) {
      const buttonElement = this.elementRef.nativeElement.querySelector('#openModal');
      buttonElement.click();
    }

  }
}
