import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputRule } from 'src/app/Directives/input-rule/input-rule.directive';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    }
  ]
})
export class InputFormComponent implements ControlValueAccessor {
  @Input()
  placeholder: string = '';
  @Input()
  isBorder: boolean = true;
  @Input()
  maxLength: number = 999;
  @Input()
  type: string = 'text';
  @Input()
  style: string = '';
  @Input()
  typeInput: string = 'normal';
  @Input()
  required: boolean = false;
  @Input()
  isMoney: boolean = false;

  @Input()
  label?: string;
  @Input()
  class: string = "";
  @Input()
  helperText?: string;
  @Input()
  errorText?: string;

  @Input()
  size: 'md' | 'lg' | 'sm' = 'md';

  @Input()
  disabled: boolean = false;
  @Input()
  background: string = 'white';

  @Input()
  isReadonly: boolean = false;

  @Input()
  isError: boolean = false;

  @Input()
  bordered: boolean = true;
  @Input()
  clearInput: boolean = true;

  @Input()
  hasEnterTrigger: boolean = false;
  @Input()
  color: string = 'purple-light';

  @Input()
  inputRule: IInputRule = '';

  @Input()
  tabIndex: string = '0'

  @Output()
  entered: EventEmitter<void> = new EventEmitter();

  @Output()
  focused: EventEmitter<void> = new EventEmitter();

  val: string = '';

  onChange: any = () => { };
  onTouch: any = () => { };

  constructor() { }

  ngOnInit() {
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

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  writeValue(value: any): void {
    this.value = value;
  }
  inputClass(): string {
    return "border-input border-light custom-item-40 "+this.class;
  }
  keypress(event: KeyboardEvent) {
    if (this.type === 'number') {
      // const inputValue: string = (event.target as HTMLInputElement).value;
      const enteredKey: string = event.key;
      // Check if the entered key is a valid number
      if (!this.isValidNumber(enteredKey)) {
        // Replace the input value with an empty string or any other desired value
        (event.target as HTMLInputElement).value = '';
        // Update the ngModel or form control value
        this.value = '';
        // Prevent the default keypress behavior
        event.preventDefault();
      }
    }

    if (!this.hasEnterTrigger) { return };
    setTimeout(() => {
      if ((event as KeyboardEvent).code === 'Enter') {
        this.entered.emit();
      }
    }, 1)
  }
  isValidNumber(key: string): boolean {
    // Check if the entered key is a valid number
    // You can use regular expressions or any other custom logic here
    // Example: return /^[0-9]+$/.test(key); // Only allow digits
    return !isNaN(Number(key));
  }
}
