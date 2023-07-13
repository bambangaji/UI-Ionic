import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  @Output()
  clickOutside: EventEmitter<void> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    const clickInside = this.elementRef.nativeElement.contains(target);
    if (!clickInside) {
      this.clickOutside.emit();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clickOutside.emit();
    }
  }
}
