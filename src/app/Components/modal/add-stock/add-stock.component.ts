import { Component, EventEmitter, Input, OnInit, Output, Type, ViewChild } from '@angular/core';
import { IonModal, PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownCustomComponent } from '../../popover/country/country.component';
@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent implements OnInit {
  @Input() idModal: string = ''
  @Input() typeAction: string = ''
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;
  vendor: string = '';
  form: FormGroup = new FormBuilder().group({
    scan: [null, [Validators.required]],
  })
  constructor(public popoverController: PopoverController) { }
  listBag = [
    {
      kode_bag: '',
      kode_bag_range: ''
    }
  ]
  generate: boolean = false;
  addBag() {
    this.listBag.push({ kode_bag: '', kode_bag_range: '' })
  }
  ngOnInit() { }
  setData(data: any) {
    this.modal?.present()
  }
  closeModal() {
    this.modal?.dismiss();
  }
  async presentPopover(e: Event, listData: string[], type: string, targetProperty: keyof AddStockComponent, component: Type<any> = DropdownCustomComponent, size: string = 'cover', search: boolean = true) {
    const popover = await this.popoverController.create({
      component: component,
      event: e,
      size: size === 'auto' ? 'auto' : 'cover',
      alignment: 'end',
      componentProps: {
        list_data: listData,
        type: type,
        search: search,
      },
      showBackdrop: false
    });
    popover.onDidDismiss().then((result) => {
      if (result.role === 'cancel') {
        console.log('Popover dismissed');
      } else {
        const selectedOption = result.data;
        console.log(`Selected option: ${selectedOption}`);
        console.log(targetProperty);
        this.vendor = selectedOption;
        // Handle the selected option here
      }
    });
    await popover.present();
  }
  async presentPopoverVendor(e: Event) {
    await this.presentPopover(e, ['UNIAIR', 'MITRA'], 'normal', 'vendor',);
  }
}
