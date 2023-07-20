import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonModal, ModalController, PopoverController } from '@ionic/angular';
import { ITableHeader } from 'src/app/Interfaces/index.interface';
import { IVendor } from 'src/app/Interfaces/vendor.intereface';
import { DetailScheduleComponent } from '../../modal/detail-schedule/detail-schedule.component';
import { ModalScheduleCreateComponent } from '../../modal/modal-schedule-create/modal-schedule-create.component';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';
import { ModalScheduleComponent } from '../../modal/modal-schedule/modal-schedule.component';

export interface ITableScheduleSettings {
  import: boolean,
  export: boolean,
  search: boolean,
  checkboxAll: boolean,
  deleteAll: boolean,
  confirm: boolean,
  detail: boolean,
  option: boolean,
  checkbox: boolean,
  trash: boolean,
  optionDetail: boolean,
  optionDelete: boolean,
  optionChange: boolean,
  optionChangeVendor: boolean,
  complete: boolean,
  status: boolean
}

@Component({
  selector: 'app-table-custom',
  templateUrl: './table-custom.component.html',
  styleUrls: ['./table-custom.component.scss'],
})
export class TableCustomComponent implements OnInit {
  @ViewChild(DetailScheduleComponent) detailScheduleComponent?: DetailScheduleComponent;
  @ViewChild(ModalScheduleCreateComponent) createScheduleComponent?: ModalScheduleCreateComponent;
  @ViewChild(ModalScheduleComponent) modalScheduleComponent?: ModalScheduleComponent;
  @Input() dataTable?: any[];
  @Input() type: string = 'schedule';
  @Input() import: boolean = true;
  @Input() export: boolean = true;
  @Input() checkAll: boolean = true;
  @ViewChild(IonModal) modal?: IonModal;
  public page: number = 1;
  public show: number = 10;
  public total_data: number = 100;
  public dataTableSettings: ITableScheduleSettings = {
    import: false,
    export: true,
    search: true,
    checkboxAll: true,
    confirm: true,
    detail: false,
    option: true,
    optionDetail: true,
    optionDelete: true,
    trash: false,
    deleteAll: false,
    optionChange: true,
    optionChangeVendor: false,
    complete: false,
    checkbox: true,
    status: false
  };
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
  constructor(
    public navService: NavigationService,
    public alertController: AlertController, public elementRef: ElementRef, public popoverController: PopoverController, public modalController: ModalController) {
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
  setData(dataheader: ITableHeader[], dataTable: any[], settings: {
    importData?: boolean;
    exportData?: boolean;
    search?: boolean;
    checkbox?: boolean;
    checkboxAll?: boolean;
    confirm?: boolean;
    detail?: boolean;
    trash?: boolean;
    option?: boolean;
    optionDetail?: boolean;
    optionDelete?: boolean;
    optionChangeVendor?: boolean;
    optionChange?: boolean;
    complete?: boolean;
    deleteAll?: boolean;
    status?: boolean;
  }, type: string = 'schedule') {
    this.type = type;
    console.log(this.type);

    this.listHeaderTabel = dataheader;
    this.setWidth();
    console.log(dataTable);
    this.dataTable = dataTable;
    const {
      importData = true,
      exportData = true,
      search = true,
      checkboxAll = true,
      confirm = true,
      detail = false,
      option = false,
      checkbox = true,
      optionDetail = true,
      trash = false,
      optionDelete = true,
      optionChangeVendor = false,
      optionChange = true,
      complete = false,
      deleteAll = false,
      status = false,
    } = settings;
    console.log(optionChangeVendor);

    this.dataTableSettings.checkboxAll = checkboxAll;
    this.dataTableSettings.complete = complete;
    this.dataTableSettings.optionDelete = optionDelete;
    this.dataTableSettings.optionChange = optionChange;
    this.dataTableSettings.status = status;
    this.dataTableSettings.optionDetail = optionDetail;
    this.dataTableSettings.option = option;
    this.dataTableSettings.detail = detail;
    this.dataTableSettings.confirm = confirm;
    this.dataTableSettings.search = search;
    this.dataTableSettings.checkbox = checkbox;
    this.dataTableSettings.export = exportData;
    this.dataTableSettings.deleteAll = deleteAll;
    this.dataTableSettings.import = importData;
    this.dataTableSettings.trash = trash;
    this.dataTableSettings.optionChangeVendor = optionChangeVendor;
    console.log(this.dataTableSettings);
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
    this.navService.toScheduleImportPage();
  }
  ngAfterViewInit() {
    const fileInput: HTMLInputElement = this.elementRef.nativeElement.querySelector('#importData');
    fileInput.addEventListener('change', () => {
      // Handle file selection here
    });
  }

  triggerFileInput() {
    const fileInput: HTMLInputElement = this.elementRef.nativeElement.querySelector('#importData');
    fileInput.click();
  }
  widthCol(width?: number) {
    if (!width) {
      return
    }
    return `min-width: ${width}px`
  }

  async openAlertKonfirmasi(val: any) {
    const data = { mawb: val.mawb, list_vendor: this.list_vendor };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'vendor')
  }

  async openAlertComplete(val: any) {
    const data = { mawb: val.mawb, list_vendor: this.list_vendor };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'sampai')
  }
  async openAlertTrash(val: any) {
    const data = { mawb: val.mawb, list_vendor: this.list_vendor };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'trash')

  }

  async openAlertChangeSchedule(val: any) {
    this.dataModalConfirm = { mawb: val.mawb };
    // this.elementRef.nativeElement.querySelector('#scheduleModal').click();
    this.createScheduleComponent?.modal?.present();
  }

  async openAlertDelete(val: any, type: number) {
    const data = { mawb: val.mawb, list_vendor: this.list_vendor };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'delete')

  }

  closeModalConfirm() {
    this.modal?.dismiss();
  }
  pilihVendor(data: any) {
    this.vendor = data;
  }
  konfirmasiSchedule() {
    this.closeAllModal();
  }
  deleteAll() {
    this.modalScheduleComponent?.setData('', 'openAlertKonfirmasi', 'delete')
  }
  async openRingkasan(p: any) {
    await this.detailScheduleComponent?.setData(p);
    this.detailScheduleComponent?.modal?.present();
  }
  deleteSchedule() {
    this.closeAllModal();
  }
  closeAllModal() {
    console.log(this.popoverController);
    this.modalController?.dismiss();
    this.popoverController.dismiss();
  }
}
