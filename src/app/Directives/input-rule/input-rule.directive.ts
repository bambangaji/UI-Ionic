import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { GlobalService } from 'src/app/Services/global/global.service';

export type IInputRule = '' | 'float' | 'currency' | 'number';

@Directive({
  selector: '[appInputRule]'
})
export class InputRuleDirective {
  @Input()
  inputRuleMax?: string;

  @Input()
  inputRule?: IInputRule;

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private globalService: GlobalService,
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('beforeinput', ['$event'])
  onBeforeInput(event: InputEvent) {
    if (!this.el.value) {
      return;
    }
    this.el.value = this.el.value.toString();
    const key = event.data;
    const cursorPosition = (this.el.children[0] as HTMLInputElement)?.selectionStart ?? 0;

    if (event.inputType === 'deleteContentBackward') {
      return true
    }
    const valueToCheck = this.el.value.split('');
    if (cursorPosition !== null && key) {
      valueToCheck.splice(cursorPosition, 0, key)
    }

    if (this.inputRule === 'float') {
      const regex = new RegExp(/^\d+[.]?\d{0,2}$/);
      if (!regex.test(valueToCheck.join(''))) {
        return false;
      }
    }

    if (this.inputRule === 'number') {
      const regex = new RegExp(/^[0-9]*$/);
      if (!regex.test(valueToCheck.join(''))) {
        return false;
      }
    }

    if (this.inputRule === 'currency') {
      const regex = new RegExp(/^[1-9][0-9]*$/);
      if (!regex.test(valueToCheck.join(''))) {
        return false;
      }
    }

    return true;
  }
}
