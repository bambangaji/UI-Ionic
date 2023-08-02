import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalScheduleComponent } from '../../modal/modal-schedule/modal-schedule.component';

@Component({
  selector: 'app-popover-table',
  templateUrl: './popover-table.component.html',
  styleUrls: ['./popover-table.component.scss'],
})
export class PopoverTableComponent implements OnInit {
  @Input() dataFromParent: any; // Input property to receive data from parent
  @Output() dataBackToParent = new EventEmitter<any>(); // Event to send data back to parent
  @ViewChild(ModalScheduleComponent) modalScheduleComponent?: ModalScheduleComponent;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }
  closePopover() {
    // Emit the data back to the parent
    this.dataBackToParent.emit('Data sent from popover');
    this.popoverController.dismiss();
  }
  async openAlertKonfirmasi(val: any) {
    console.log(val);

    const data = { mawb: val.mawb, list_vendor: [] };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'vendor')
  }

  async openAlertComplete(val: any) {
    const data = { mawb: val.mawb, list_vendor: [] };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'sampai')
  }
  async openAlertTrash(val: any) {
    const data = { mawb: val.mawb, list_vendor: [] };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'trash')
  }

  async openAlertChangeSchedule(val: any) {
    // this.dataModalConfirm = { mawb: val.mawb };
    // // this.elementRef.nativeElement.querySelector('#scheduleModal').click();
    // this.createScheduleComponent?.modal?.present();
  }

  async openAlertDelete(val: any, type: number) {
    const data = { mawb: val.mawb, list_vendor: [] };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'delete')
  }
}
