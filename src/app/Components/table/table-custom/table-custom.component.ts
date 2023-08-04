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


@Component({
  selector: 'app-table-custom',
  templateUrl: './table-custom.component.html',
  styleUrls: ['./table-custom.component.scss'],
})
export class TableCustomComponent implements OnInit {
  @ViewChild(DetailScheduleComponent) detailScheduleComponent?: DetailScheduleComponent;
  @ViewChild(ModalScheduleCreateComponent) createScheduleComponent?: ModalScheduleCreateComponent;
  @ViewChild(ModalScheduleComponent) modalScheduleComponent?: ModalScheduleComponent;
  @ViewChild(PopoverController) popoverComponent?: PopoverController;
  @ViewChild(FilterComponent) filterComponent?: FilterComponent;
  @ViewChild(ModalKeberangkatanComponent) keberangkatanComponent?: ModalKeberangkatanComponent;
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
    optionRiwayat: true,
    optionDetail: true,
    optionDelete: true,
    trash: false,
    deleteAll: false,
    optionChange: true,
    optionChangeVendor: false,
    complete: false,
    checkbox: true,
    status: false,
    mawb: true,
    airlines: true,
    agent: true,
    collie: true,
    departed: true,
    weight: true,
    bagRanges: false,
    totalBag: false,
    totalCollie: false,
    print: false,
    noFlight: false,
    estBag: false,
    estWeight: false,
    bag: false,
    ready: false
  };
  jsonData: any[];
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
    public alertController: AlertController,
    public elementRef: ElementRef,
    public popoverController: PopoverController,
    public modalController: ModalController,
    public excelService: ConvertExcelService
  ) {
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
    print?: boolean;
    mawb?: boolean;
    airlines?: boolean;
    collie?: boolean;
    bagRanges?: boolean;
    totalBag?: boolean;
    totalCollie?: boolean;
    weight?: boolean;
    departed?: boolean;
    agent?: boolean;
    noFlight?: boolean;
    optionRiwayat?: boolean;
    estBag?: boolean;
    estWeight?: boolean;
    bag?: boolean;
    ready?: boolean;
  }, type: string = 'schedule') {
    this.type = type;
    this.listHeaderTabel = dataheader;
    this.setWidth();
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
      print = false,
      mawb = true,
      bagRanges = false,
      agent = true,
      airlines = true,
      collie = true,
      departed = true,
      totalBag = false,
      totalCollie = false,
      weight = true,
      optionRiwayat = false,
      noFlight = false,
      estBag = false,
      estWeight = false,
      bag = false,
      ready = false,
    } = settings;
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
    this.dataTableSettings.weight = weight;
    this.dataTableSettings.agent = agent;
    this.dataTableSettings.totalCollie = totalCollie;
    this.dataTableSettings.totalBag = totalBag;
    this.dataTableSettings.print = print;
    this.dataTableSettings.mawb = mawb;
    this.dataTableSettings.airlines = airlines;
    this.dataTableSettings.bagRanges = bagRanges;
    this.dataTableSettings.collie = collie;
    this.dataTableSettings.departed = departed;
    this.dataTableSettings.optionRiwayat = optionRiwayat;
    this.dataTableSettings.noFlight = noFlight;
    this.dataTableSettings.estBag = estBag;
    this.dataTableSettings.estWeight = estWeight;
    this.dataTableSettings.bag = bag;
    this.dataTableSettings.ready = ready;
    console.log(this.dataTableSettings);
  }
  setWidth() {
    const width = 220;
    const totalWidth = width * this.listHeaderTabel!.length;
    console.log(this.customCssContent = `height: ${this.height}px ;width: ${totalWidth}px`);
    return this.customCssContent = `height: ${this.height} ;width: ${totalWidth}px; min-width: 93vw`
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
    const data = { mawb: val.mawb, list_vendor: this.list_vendor, type: 'trash' };
    this.modalScheduleComponent?.setData(data, 'openAlertKonfirmasi', 'trash')
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
  async presentPopover(ev: Event) {
    // this.popoverController.dismiss();
    // const popover = await this.popoverController.create({
    //   event: ev,
    //   translucent: true,
    //   componentProps: {
    //     // Add any data you want to pass to the popover content here
    //   },
    //   component: this.popoverContent,
    // });

    // await popover.present();
  }
  okEmit(data: any) {
    console.log(data);
    this.modalScheduleComponent?.modal?.dismiss();
    if (data.type === 'trash') {
      const indexToRemove = this.dataTable!.findIndex((item: any) => item.mawb === data.mawb);

      if (indexToRemove !== -1) {
        this.dataTable!.splice(indexToRemove, 1);
      }
    }
  }
  cancelEmit(data: any) {
    console.log(data);
  }
  sortDataAscending(value: any) {
    console.log(value);
    console.log(this.dataTable);
    console.log(this.dataTableSettings);

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
  deleteSchedule() {
    this.closeAllModal();
  }
  closeAllModal() {
    this.modalController?.dismiss();
    this.popoverController.dismiss();
  }
  handleFile(event: any) {
    console.log(event);

    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: Uint8Array = new Uint8Array(e.target.result);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      this.jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(this.jsonData);
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

    console.log(objects);
    this.dataTable = objects;
  }
}
