import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-bag',
  templateUrl: './delete-bag.component.html',
  styleUrls: ['./delete-bag.component.scss'],
})
export class DeleteBagComponent implements OnInit {
  @Input() idModal: string = ''
  @Input() typeAction: string = ''
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;
  form: FormGroup = new FormBuilder().group({
    scan: [null, [Validators.required]],
  })
  constructor() { }

  ngOnInit() { }
  setData(data: any) {
    this.modal?.present()
  }
  closeModal() {
this.modal?.dismiss();
  }
}
