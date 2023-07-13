import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-form-phone-number',
  templateUrl: './input-form-phone-number.component.html',
  styleUrls: ['./input-form-phone-number.component.scss'],
})
export class InputFormPhoneNumberComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  onPhoneValueChange(value: string): void {
    console.log(value)
  }
}
