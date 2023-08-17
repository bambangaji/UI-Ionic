import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-bag',
  templateUrl: './confirm-bag.component.html',
  styleUrls: ['./confirm-bag.component.scss'],
})
export class ConfirmBagComponent implements OnInit {
  @Input() idModal: string = ''
  @Input() typeAction: string = ''
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild(IonModal) modal?: IonModal;
  form: FormGroup = new FormBuilder().group({
    berat: [null, [Validators.required]],
    foto: [null, [Validators.required]],
  })
  constructor(public elementRef: ElementRef) { }

  ngOnInit() { }
  setData(data: any) {
    this.modal?.present()
  }
  ngAfterViewInit() {
  }
  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }

  }
}
