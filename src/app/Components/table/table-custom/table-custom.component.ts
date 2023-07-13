import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { ITableHeader } from 'src/app/Interfaces/index.interface';
import { IVendor } from 'src/app/Interfaces/vendor.intereface';

@Component({
  selector: 'app-table-custom',
  templateUrl: './table-custom.component.html',
  styleUrls: ['./table-custom.component.scss'],
})
export class TableCustomComponent implements OnInit {

  @Input() dataTable?: any[];
  @Input() type: string = 'schedule';
  @Input() import: boolean = true;
  @Input() export: boolean = true;
  @Input() checkAll: boolean = true;
  @ViewChild(IonModal) modal?: IonModal;
  public page: number = 1;
  public show: number = 10;
  public total_data: number = 100;
  public dataTableSettings: any;
  public list_vendor?: IVendor[] = [{ icon: '', name: 'HD', uuid: '50' }, { icon: '', name: 'MINA', uuid: '10' }];
  public vendor: IVendor = { icon: '', name: '', uuid: '' };
  public customCssContent: string = 'height:600px; width:1600px;';
  public width: string = '1600px';
  public height: string = '600px';
  public dataModalConfirm?: any;
  isCheckAll: boolean = false;
  formSearch: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  public listHeaderTabel?: ITableHeader[]
  constructor(public alertController: AlertController, public elementRef: ElementRef) {
    this.formSearch.get('search')!.valueChanges.subscribe((value) => {
      // Handle the value change
      this.resetData();
      this.getData(value, false)
    });
  }
  resetData() {

  }
  getData(value: string, isLoading: boolean = true) {

  }
  ngOnInit() {
    this.setData([], [], {})
  }
  setData(dataheader: ITableHeader[], dataTable: any[], dataTableSettings: any = {}, type: string = 'schedule') {
    this.dataTableSettings = dataTableSettings;
    this.type = type;
    this.listHeaderTabel = dataheader;
    this.setWidth();
    console.log(dataTable);
    this.dataTable = dataTable;
  }
  setWidth() {
    const width = 220;
    const totalWidth = width * this.listHeaderTabel!.length;
    console.log(this.customCssContent = `height: ${this.height}px ;width: ${totalWidth}px`);
    return this.customCssContent = `height: ${this.height} ;width: ${totalWidth}px`
  }
  exportData() {

  }
  importData() {

  }
  widthCol(width?: number) {
    if (!width) {
      return
    }
    return `min-width: ${width}px`
  }
  async openAlertKonfirmasi(val: any) {
    this.dataModalConfirm = { mawb: val.mawb };
    this.elementRef.nativeElement.querySelector('#scheduleModal').click();
    // await alert.present();
  }
  closeModalConfirm() {
    this.modal?.dismiss();
  }
  pilihVendor(data: any) {
    this.vendor = data;
  }
  konfirmasiSchedule() {
    this.modal?.dismiss();
  }
  deleteAll() {
    this.dataTable = [];
  }
}
