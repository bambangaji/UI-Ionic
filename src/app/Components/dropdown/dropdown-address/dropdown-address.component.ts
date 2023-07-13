import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface IOption {
  label: string,
  value: string | number,
}
@Component({
  selector: 'app-dropdown-address',
  templateUrl: './dropdown-address.component.html',
  styleUrls: ['./dropdown-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownAddressComponent),
      multi: true,
    }
  ]
})
export class DropdownAddressComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() isLocation: boolean = false;
  @Input() isBorder: boolean = true;
  @Input() isGetID: boolean = false;
  @Input() selectClass: string = 'custom-select';
  @Input() options: IOption[] = [];
  @Output()
  selected: EventEmitter<IOption> = new EventEmitter<IOption>()
  val: string = '';
  onChange: any = () => { };
  onTouch: any = () => { };
  constructor() { }

  ngOnInit() { }
  selectedOption(option: IOption) {
    console.log(this.options);
    
    this.selected.emit(option);
  }

  set value(val) {
    if (val === this.val) { return; }
    this.val = val;
    this.onChange(this.val);
    this.onTouch(this.val);
  }
  get value() {
    return this.val;
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
}
