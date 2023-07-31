import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { IonModal, PopoverController } from '@ionic/angular';
import { HistoryAktivitasComponent } from '../../sidebar/history-aktivitas/history-aktivitas.component';
import { ISchedule } from 'src/app/Interfaces/schedule.interface';
import { GlobalService } from 'src/app/Services/global/global.service';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';



@Component({
  selector: 'app-process-bag',
  templateUrl: './process-bag.component.html',
  styleUrls: ['./process-bag.component.scss'],
})
export class ProcessBagComponent implements OnInit {
  @Input() idModal: string = '';
  @Input() type: string = 'table';
  @Output() myEvent = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild(HistoryAktivitasComponent) historyComponent?: HistoryAktivitasComponent;
  [key: string]: any;
  isJadwal = true;
  isProject = true;
  data: ISchedule;
  today = new Date();
  checkAll = false;
  listData = [
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
    {
      name: 'R635463453',
      value: 'Maslindo Airways',
      total_weight: 20,
      isChecked: false,
      isExpanded: false,
      resi: [
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
        {
          name: '16243125612',
          weight: 5,
          isChecked: false,
        },
      ]
    },
  ]
  backupData: any;
  filterFrom = 0;
  filterTo = 0;
  isEditFrom = false;
  isEditTo = false;
  currentDateTime: string;
  totalWeight: number = 0;
  totalResi: number = 0;
  currentTab: string = 'Detail';
  sendData: any[] = [];
  constructor(
    public popoverController: PopoverController, public globalService: GlobalService,
    public navService: NavigationService
  ) { }
  ngOnInit(): void {
    this.getCurrentDateTime();
    this.getTotalBag();
    this.backupData = this.listData;
  }
  getCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
    console.log(this.currentDateTime);

  }
  resetData() {
    this.currentTab = 'Detail';
  }
  changeTab(tab: string) {
    this.currentTab = tab;
    console.log('asdsad');
    console.log(this.historyComponent);

    this.historyComponent?.setData(this.data);
  }
  setData(data: any) {
    this.resetData();
    this.data = data;
  }
  getTotalBag() {
    let weight = 0
    let resi = 0
    for (let j of this.listData) {
      weight += j.total_weight;
      resi += j.resi.length;
    }
    this.totalWeight = weight;
    this.totalResi = resi;
  }
  getHeight() {
    return this.historyComponent?.setHeight(4);
  }
  setHeight(length: number) {
    const height = 200;
    const total_height = height * length;
    return `height:${total_height}px;`;
  }
  closeModal() {
    this.globalService.closePopover();
    this.modal?.dismiss()
  }
  editFrom() {
    this.applyFilterFrom();
    this.isEditFrom = !this.isEditFrom;

  }
  editTo() {
    this.applyFilterTo();
    this.isEditTo = !this.isEditTo;
  }
  applyFilterFrom() {
    console.log(this.listData);
    if (this.isEditFrom) {
      let data = [...this.listData];;
      for (let i = data.length - 1; i > this.filterTo; i--) {
        data.splice(i, 1);
      }

      for (let i = this.filterFrom - 1; i >= 0; i--) {
        data.splice(i, 1);
      }
      this.backupData = data;
    }

    console.log(this.listData);

  }
  applyFilterTo() {
    console.log(this.listData);

    if (this.isEditTo) {
      let data = [...this.listData];;
      for (let i = data.length - 1; i > this.filterTo; i--) {
        data.splice(i, 1);
      }

      for (let i = this.filterFrom - 1; i >= 0; i--) {
        data.splice(i, 1);
      }
      this.backupData = data;
      console.log(this.listData);
    }

  }
  loadMoreData(event: any) {
    // Simulate loading more data
    setTimeout(() => {
      // const newData = this.generateData(5); // Load 5 more items
      // this.gridData = [...this.gridData, ...newData];
      event.target.complete();

      // Optionally, disable the infinite scroll when no more data is available
      // if (newData.length === 0) {
      //   event.target.disabled = true;
      // }
    }, 1000);
  }
  checkAllData() {
    this.backupData.map((item: any) => {
      item.isChecked = true;
    })
  }
  getCheckItemsBag(): number {
    let total = 0;
    this.listData.forEach((item) => {
      if (item.isChecked) total++;
    });
    return total
  }
  getCheckItemsResi(): number {
    let total = 0;
    this.listData.forEach((item) => {
      if (item.isChecked) total += item.resi.length;
    });
    return total
  }
  getCheckItemsBerat(): number {
    let total = 0;
    this.listData.forEach((item) => {
      if (item.isChecked) total += item.total_weight;
    });
    return total
  }
  goToTable() {
    this.modal?.dismiss();
    console.log(this.type);
    
    if (this.type === 'table') {
      let dataChecklist = this.listData.map((item) => ({
        ...item,
        resi: item.resi.filter((itemChild) => itemChild.isChecked)
      }));
      
      dataChecklist = dataChecklist.filter((item) => item.isChecked || item.resi.length > 0);
      return this.myEvent.emit(dataChecklist)
    }
    this.navService.toTablePage();
  }
  checkItem(item: any, j: any = '0') {
    if (item.resi) {
      for (let i of item.resi) {
        i.isChecked = !item.isChecked;
      }
    } else {
      let countChecked = 0;
      for (let i of this.listData[j].resi) {
        if (i.isChecked) {
          countChecked++;
        }
      }
      if (countChecked === this.listData[j].resi.length) {
        this.listData[j].isChecked = true;
      } else {
        this.listData[j].isChecked = false;
      }
      item.isChecked = !item.isChecked;
    }
  }
}
