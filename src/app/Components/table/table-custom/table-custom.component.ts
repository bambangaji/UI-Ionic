import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonModal, ModalController, PopoverController } from '@ionic/angular';
import { ITableHeader, ITableScheduleSettings } from 'src/app/Interfaces/index.interface';
import { IVendor } from 'src/app/Interfaces/vendor.intereface';
import { DetailScheduleComponent } from '../../modal/detail-schedule/detail-schedule.component';
import { ModalScheduleCreateComponent } from '../../modal/modal-schedule-create/modal-schedule-create.component';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';
import { ModalScheduleComponent } from '../../modal/modal-schedule/modal-schedule.component';
import { PopoverTableComponent } from '../../popover/popover-table/popover-table.component';
import { FilterComponent } from '../../modal/filter/filter.component';
import { ConvertExcelService } from 'src/app/Services/convert-excel/convert-excel.service';
import { ModalKeberangkatanComponent } from '../../modal/modal-keberangkatan/modal-keberangkatan.component';
import * as XLSX from 'xlsx';
import { HoverComponent } from '../../popover/hover/hover.component';
import { GlobalService } from 'src/app/Services/global/global.service';
import { DetailBagComponent } from '../../modal/detail-bag/detail-bag.component';
import { DeleteBagComponent } from '../../modal/delete-bag/delete-bag.component';


@Component({
  selector: 'app-table-custom',
  templateUrl: './table-custom.component.html',
  styleUrls: ['./table-custom.component.scss'],
})
export class TableCustomComponent implements OnInit {
  @ViewChild(DetailScheduleComponent) detailScheduleComponent?: DetailScheduleComponent;
  @ViewChild(DetailBagComponent) detailBagComponent?: DetailBagComponent;
  @ViewChild(ModalScheduleCreateComponent) createScheduleComponent?: ModalScheduleCreateComponent;
  @ViewChild(ModalScheduleComponent) modalScheduleComponent?: ModalScheduleComponent;
  @ViewChild(PopoverController) popoverComponent?: PopoverController;
  @ViewChild(FilterComponent) filterComponent?: FilterComponent;
  @ViewChild(ModalKeberangkatanComponent) keberangkatanComponent?: ModalKeberangkatanComponent;
  @ViewChild(DeleteBagComponent) deleteBagComponent?: DeleteBagComponent;
  @ViewChild(HoverComponent) hoverComponent?: HoverComponent;
  @Input() dataTable: any[] = [];
  @Input() type: string = 'schedule';
  @Input() import: boolean = true;
  @Input() export: boolean = true;
  @Input() checkAll: boolean = true;
  @ViewChild(IonModal) modal?: IonModal;
  public page: number = 1;
  public show: number = 10;
  public total_data: number = 100;
  public isReady: boolean = false;
  defaultSettings: ITableScheduleSettings = {
    checkboxAll: true,
    confirm: true,
    detail: false,
    option: false,
    checkbox: true,
    optionDetail: true,
    trash: false,
    optionDelete: true,
    optionChangeVendor: false,
    optionChange: true,
    complete: false,
    deleteAll: false,
    status: false,
    print: false,
    mawb: true,
    bagRanges: false,
    agent: true,
    airlines: true,
    collie: true,
    departed: true,
    totalBag: false,
    totalCollie: false,
    weight: true,
    optionRiwayat: false,
    noFlight: false,
    estBag: false,
    estWeight: false,
    bag: false,
    ready: false,
    infoBag: false,
    destinasi: true,
    created_at: true,
    diperbarui: false,
    loading_bag: false,
    date_flight: false,
    edited: false,
    add_penerbangan: false,
  };
  public dataTableSettings: ITableScheduleSettings = this.defaultSettings;
  jsonData: any[];
  public list_vendor?: IVendor[] = [{ icon: '', name: 'HD', uuid: '50' }, { icon: '', name: 'MINA', uuid: '10' }];
  public vendor: IVendor = { icon: '', name: '', uuid: '' };
  public customCssContent: string = 'height:600px; width:1600px;';
  public width: string = '1600px';
  public height: string = '600px';
  public dataModalConfirm?: any;
  openTooltip: boolean = false;
  isCheckAll: boolean = false;
  formSearch: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  public listHeaderTabel: ITableHeader[] = []
  constructor(
    public navService: NavigationService,
    public alertController: AlertController,
    public elementRef: ElementRef,
    public popoverController: PopoverController,
    public modalController: ModalController,
    public excelService: ConvertExcelService,
    public globalService: GlobalService
  ) {
    this.formSearch.get('search')!.valueChanges.subscribe((value) => {
      // Handle the value change
      this.resetData();
      this.getData(value, false)
    });
  }
  tooltipStates: { [key: string]: { [key: string]: boolean } } = {};

  toggleTooltip(uuid: any, tooltipKey: string, show: boolean) {
    this.openTooltip = show;
    this.tooltipStates[uuid][tooltipKey] = show;
  }

  resetData() {
    this.isReady = false;
  }
  getData(value: string, isLoading: boolean = true) {

  }
  ngOnInit() {
    this.setData([], [], {})
  }
  async setData(dataheader: ITableHeader[], dataTable: any[], settings: ITableScheduleSettings, type: string = 'schedule') {
    this.type = type;
    this.listHeaderTabel = dataheader;
    this.setWidth();
    this.dataTable = dataTable;

    this.dataTableSettings = {
      ...this.defaultSettings,
      ...settings,
    };
    this.dataTable.forEach(item => {
      this.tooltipStates[item.uuid] = this.setPropertiesToFalse();
    });
    this.isReady = true;
  }
  setPropertiesToFalse(): { [key: string]: boolean } {
    const newObj: { [key: string]: boolean } = {};
    for (const key in this.dataTable![0]) {
      if (this.dataTable![0].hasOwnProperty(key)) {
        newObj[key] = false;
      }
    }
    return newObj;
  }
  setWidth() {
    const width = 210;
    let total_width = 0;
    for (let j of this.listHeaderTabel) {
      if (j.width) {
        total_width += j.width;
      } else {
        total_width += width;
      }

    }
    return this.customCssContent = `height: ${this.height} ;width: ${total_width}px; min-width: 93vw`
  }
  exportData() {
    this.excelService.convertToExcel(this.dataTable)
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
  widthCol(width?: number, type?: string, name?: string) {
    if (type === 'body') {
      const d = this.listHeaderTabel?.filter((item: any) => item.label === name);
      if (d!.length > 0) {
        width = d![0].width;
      }
    }
    if (!width) {
      return
    }
    return `min-width: ${width}px; max-width: ${width}px;`
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
    const data = { mawb: val.mawb, list_vendor: this.list_vendor, type: 'trash' };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'trash')
  }

  async openAlertTrashBag(val: any) {
    this.deleteBagComponent?.setData(val);
  }

  async openKeberangkatan(p: any) {
    await this.keberangkatanComponent?.setData(p);
    this.keberangkatanComponent?.modal?.present();
  }
  async openAlertChangeSchedule(val: any) {
    this.popoverController.dismiss();
    this.dataModalConfirm = { mawb: val.mawb };
    // this.elementRef.nativeElement.querySelector('#scheduleModal').click();
    this.createScheduleComponent?.modal?.present();
  }

  async openAlertDelete(val: any, type: number) {
    this.popoverController.dismiss();
    const data = { mawb: val.mawb, list_vendor: this.list_vendor };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'delete')
  }
  async openManifest(data: any) {
    this.popoverController.dismiss();
    this.navService.toTablePage(this.type, data.uuid || '');
  }
  async openFilter() {
    this.filterComponent?.modal?.present();
  }
  okEmit(data: any) {
    this.modalScheduleComponent?.modal?.dismiss();
    if (data.type === 'trash') {
      const indexToRemove = this.dataTable!.findIndex((item: any) => item.mawb === data.mawb);

      if (indexToRemove !== -1) {
        this.dataTable!.splice(indexToRemove, 1);
      }
    }
  }
  cancelEmit(data: any) {
  }
  sortDataAscending(value: any) {
    this.listHeaderTabel!.map((data: any) => { data.sortASC = true })
    value.sortASC = true;
    this.dataTable!.sort((a, b) => {
      if (value.label.toLowerCase() === 'destinasi')
        return a.country.localeCompare(b.country);
      if (value.label.toLowerCase() === 'schedule')
        return a.date_departed.localeCompare(b.date_departed);
      if (value.label.toLowerCase() === 'est.weight')
        return a.weight.toLocaleString().localeCompare(b.weight);
      if (value.label.toLowerCase() === 'est.collie')
        return a.collie.toLocaleString().localeCompare(b.collie);
      if (value.label.toLowerCase() === 'dibuat')
        return a.created_at.localeCompare(b.created_at);
      if (value.label.toLowerCase() === 'no.flight')
        return a.created_at.localeCompare(b.created_at);
      else
        return a[value.label.toLocaleString().toLowerCase()].localeCompare(b[value.label.toLocaleString().toLowerCase()]);
    });
  }
  validateDate(data: string): boolean {
    const [datePart, timePart] = data.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    const dateDeparted = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
    const today = new Date();

    return dateDeparted < today;

  }
  sortDataDescending(value: any) {
    this.listHeaderTabel!.map((data: any) => { data.sortASC = true })
    value.sortASC = false;
    this.dataTable!.sort((a, b) => {
      if (value.label.toLowerCase() === 'destinasi')
        return b.country.localeCompare(a.country);
      if (value.label.toLowerCase() === 'schedule')
        return b.date_departed.localeCompare(a.date_departed);
      if (value.label.toLowerCase() === 'est.weight')
        return b.weight.toLocaleString().localeCompare(a.weight);
      if (value.label.toLowerCase() === 'est.collie')
        return b.collie.toLocaleString().localeCompare(a.collie);
      if (value.label.toLowerCase() === 'dibuat')
        return b.created_at.localeCompare(a.created_at);
      else
        return b[value.label.toLocaleString().toLowerCase()].localeCompare(a[value.label.toLocaleString().toLowerCase()]);
    });
  }
  async openPopover(ev: Event, d: any) {
    const popover = await this.popoverController.create({
      component: PopoverTableComponent,
      event: ev,
      translucent: true,
      componentProps: {
        data: d
      }
    });
    return await popover.present();
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
    console.log(p);
    this.popoverController.dismiss();
    await this.detailScheduleComponent?.setData(p);
    this.detailScheduleComponent?.modal?.present();
  }
  async openRingkasanBag(p: any) {
    console.log(p);
    this.detailBagComponent?.setData(p);
  }
  deleteSchedule() {
    this.closeAllModal();
  }
  closeAllModal() {
    this.modalController?.dismiss();
    this.popoverController.dismiss();
  }
  handleFile(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: Uint8Array = new Uint8Array(e.target.result);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.convertArray(this.jsonData)
    };
    reader.readAsArrayBuffer(file);

  }
  convertArray(data: any) {
    // Extract the keys from the first sub-array
    const keys = data[0];

    // Convert the rest of the sub-arrays into objects using the keys
    const objects = data.slice(1).map((subArray: any) => {
      const obj: any = {};
      keys.forEach((key: any, index: any) => {
        obj[key] = subArray[index];
      });
      return obj;
    });
    this.dataTable = objects;
  }
}
