import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputRule } from 'src/app/Directives/input-rule/input-rule.directive';

@Component({
  selector: 'app-input-field-label',
  templateUrl: './input-field-label.component.html',
  styleUrls: ['./input-field-label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldLabelComponent),
      multi: true,
    }
  ]
})
export class InputFieldLabelComponent implements ControlValueAccessor {
  @Input()
  label?: string;

  @Input()
  placeholder?: string;

  @Input()
  size: 'md' | 'lg' | 'sm' = 'md';

  @Input()
  type: 'text' | 'password' = 'text';

  @Input()
  required: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  isReadonly: boolean = false;

  @Input()
  isError: boolean = false;

  @Input()
  bordered: boolean = true;

  @Input()
  hasEnterTrigger: boolean = false;

  @Input()
  inputRule: IInputRule = '';

  @Input()
  tabIndex: string = '0'

  @Output()
  entered: EventEmitter<void> = new EventEmitter();
  
  @Output()
  focused: EventEmitter<void> = new EventEmitter();

  val     : string = '';

  onChange: any = () => {};
  onTouch : any = () => {};

  constructor() { }

  ngOnInit() {}

  set value(val) {
    if (val === this.val) { return; }

    this.val = val;
    this.onChange(this.val);
    this.onTouch(this.val);
  }
  get value() {
    return this.val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  keypress(event: Event) {
    if (!this.hasEnterTrigger) { return };

    setTimeout(() => {
      if ((event as KeyboardEvent).code === 'Enter') {
        this.entered.emit();
      }
    }, 1)
  }
}
