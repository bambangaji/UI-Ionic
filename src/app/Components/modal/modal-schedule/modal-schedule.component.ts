import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/Services/global/global.service';
import { IonModal, ModalController, PopoverController } from '@ionic/angular';
import { IVendor } from 'src/app/Interfaces/vendor.intereface';

@Component({
  selector: 'app-modal-schedule',
  templateUrl: './modal-schedule.component.html',
  styleUrls: ['./modal-schedule.component.scss'],
})
export class ModalScheduleComponent implements OnInit {
  @Input() idModal: string = ''
  @ViewChild(IonModal) modal?: IonModal;
  dataModal: any = {};
  type: string = ''
  public list_vendor?: IVendor[] = [{ icon: '', name: 'HD', uuid: '50' }, { icon: '', name: 'MINA', uuid: '10' }];
  public vendor: IVendor = { icon: '', name: '', uuid: '' };

  constructor(private globalService: GlobalService, private popoverController: PopoverController, private modalController: ModalController) { }

  ngOnInit() { }
  pilihVendor(data: any) {
    this.vendor = data;
  }
  async setData(data: any, id: string, type: string) {
    this.type = type
    if (this.type === 'vendor') {
      console.log(data);
      this.list_vendor = data.list_vendor;
      this.dataModal.mawb = data.mawb;
      console.log(this.dataModal);

    }
    this.idModal = id;
    await this.globalService.delay(100);
    this.modal?.present();
  }

  closeAllModal() {
    this.modalController?.dismiss();
    this.popoverController?.dismiss();
  }
}
