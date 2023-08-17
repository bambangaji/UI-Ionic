import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IHeader, ITableHeader } from 'src/app/Interfaces/index.interface';
import { DetailScheduleComponent } from '../../modal/detail-schedule/detail-schedule.component';

@Component({
  selector: 'app-table-excel',
  templateUrl: './table-excel.component.html',
  styleUrls: ['./table-excel.component.scss'],
  animations: [
    // Define the animation trigger
    trigger('minimizeHeight', [
      // Define the states
      state('expanded', style({ height: '*' })),
      state('minimized', style({ height: '0', padding: '0', margin: '0', opacity: '0' })),

      // Define the transitions between states
      transition('expanded <=> minimized', animate('300ms ease-in')),
    ]),
  ],
})
export class TableExcelComponent implements OnInit {
  @Input() dataInput: any;
  @Input() type: any;
  @Output() myEvent = new EventEmitter<any>();
  @Output() getDataOriginal = new EventEmitter<any>();
  @ViewChild(DetailScheduleComponent) detailComponent: DetailScheduleComponent;
  listData: ITableHeader[];
  listDataTable: any = [];
  dataDetail: any;
  data: ITableHeader;
  tempData: any;
  getWidthRow: string = '';
  getMinusWidth: number = 0;
  total_freeze_col: number = 0;
  isMinimized: boolean = false;
  headers: any[] = [];
  body: any;
  constructor() { }
  widthCol(width?: number, index: number = 0, freeze?: boolean) {
    if (!width) {
      return
    }
    let output = `min-width: ${width}px; width: ${width}px; max-width: ${width}px;`
    // if (this.listData[index].freeze) {
    //   const left = index * width - this.listData[0].width!;
    //   output = `min-width: ${width}px;width: ${width}px; max-width: ${width}px;left: ${left <= 0 ? 0 : left}px;`
    //   if (index === this.total_freeze_col - 1) {
    //     output = `min-width: ${width}px;width: ${width}px; max-width: ${width}px; left: ${left <= 0 ? 0 : left}px; margin-right:15px;`
    //   }
    // }
    if (this.headers[index].freeze) {
      let minus = 0;
      this.headers.map((item: any, i: any) => {
        if (i < index) {
          minus += item.width;
        }
      })
      const left = minus;
      this.getMinusWidth = left;
      output = `min-width: ${width}px;width: ${width}px; max-width: ${width}px;left: ${left <= 0 ? 0 : left}px;`
      if (index === this.total_freeze_col - 1) {
        output = `min-width: ${width}px;width: ${width}px; max-width: ${width}px; left: ${left <= 0 ? 0 : left}px; margin-right:15px;`
      }
    }
    return output;
  }
  getWidth(index: number) {
    return `width: ${index}px; important`
  }
  openDetail(data: any) {
    let listData: any[] = [];
    const headerMap = this.listDataTable.map((map: any) => {
      const matchingItem = map.data.find((item: any) => item.uid === data.uid);
      const dataTemplate = {
        name: map.label,
        value: matchingItem.name
      }
      listData.push(dataTemplate);
    }, {});
    this.dataDetail =
      listData
    this.detailComponent.modal?.present();
  }
  widthRow() {
    const width = 200;
    let totalData = 0;
    let freeze_col = 0;
    for (let j of this.headers) {
      if (j.width) {
        totalData += j.width;
      } else {
        totalData += width
      }
      if (j.freeze) {
        freeze_col++;
      }
    }
    // for (let j of this.listData) {
    //   if (j.width) {
    //     totalData += j.width;
    //   } else {
    //     totalData += width
    //   }
    //   if (j.freeze) {
    //     freeze_col++;
    //   }
    // }
    this.total_freeze_col = freeze_col;
    this.getWidthRow = `min-width: ${totalData + 100}px`
  }
  cekFunction(status: boolean) {
    if (status) {
      this.listData.map((item) => {
        item.expand = !item.expand;
      })
    }
  }
  ngOnInit() { }
  changeValue(value: any) {
    value.openEdit = true;
  }
  openEdit(value: any) {
    value.openEdit = true;
  }
  applyEdit(value: any) {
    value.openEdit = false;

  }
  closeEdit(value: any) {
    value.openEdit = false;
    // value.name = value.tempData;
  }
  checkboxRow(value: any) {
    value.isChecked = !value.isChecked;
  }
  expandColumn(value: any) {
    console.log(value);
    if (value.columnKey === 'tutup_semua_bag') {
      console.log('asds');
      
      this.isMinimized = !this.isMinimized;
      value.label = this.isMinimized ? "BUKA SEMUA BAG" : "TUTUP SEMUA BAG"
    }
  }
  hideColumn(value: any) {
    value.isShow = !value.isShow;
    console.log('hide', value);

  }
  checkboxExpand2(value: any, index: number, j: number) {
    console.log('sdad');

  }

  checkboxExpand(value: any, index: number, j: number, event: Event) {
    if (value.key_parent) {
      this.listDataTable[0].data.map((data: any) => {
        if (data.parent_key === value.key_parent) {
          data.isChecked = value.isChecked;
        }
      })
    } else {
      let countChecked = 0;
      const listChild = this.listDataTable[0].data.filter((data: any) => data.parent_key === value.parent_key
      )
      for (let i of listChild) {
        if (i.isChecked) {
          countChecked++;
        }
      }
      if (countChecked === listChild.length) {
        this.listDataTable[0].data.map((data: any) => {
          if (data.key_parent === value.parent_key) {
            data.isChecked = true;
          }
        });
      } else {
        this.listDataTable[0].data.map((data: any) => {
          if (data.key_parent === value.parent_key) {
            data.isChecked = false;
          }
        });
      }
    }
    this.myEvent.emit(this.listDataTable[0].data);
  }
  addNewHeader(settings: { label: string, freeze: boolean, width: number, css: string, isFunction: boolean, columnKey: string, data: any }) {
    const {
      label = 'New Header',
      freeze = false,
      width = 200,
      css = '',
      isFunction = false,
      columnKey = '',
      data = ''
    } = settings;

    const newHeader = {
      label: label,
      freeze: freeze, // Adjust the properties as needed for the new header
      width: width,
      css: css,
      function: isFunction,
      columnKey: columnKey,
      isShow: false,
      data: data
    };
    // console.log(newHeader);

    this.headers.push(newHeader);

    // Add the new property to each data object with a default value
    this.listDataTable.forEach((row: any) => {
      row[newHeader.columnKey] = ''; // Replace '' with the default value if needed
    });
  }

  addNewData(newData: any) {
    let dataExpand: any = [];
    // console.log(newData);

    // for (let j of newData.dataExpand) {
    //   // console.log(j);

    //   const data = this.generateDataExpand(j)
    //   dataExpand.push(data);
    // }
    let dataRow: any =
    {
      dataExpand: dataExpand
    }; // Define dataRow with the 'any' type
    this.headers.forEach((header) => {
      const columnKey = header.columnKey;
      if (newData[columnKey] === undefined) {
        newData[columnKey] = '';
      }
      dataRow[columnKey] = this.generateSettingColumn(newData[columnKey]);
    });
    this.listDataTable.push(dataRow);
    // console.log(this.listDataTable);
    // console.log(this.headers);
  }
  generateDataExpand(newData: any,) {
    // console.log(newData);
    let dataRow: any =
    {
    }; // Define dataRow with the 'any' type
    this.headers.forEach((header) => {
      const columnKey = header.columnKey;
      if (newData[columnKey] === undefined) {
        newData[columnKey] = '';
      }
      dataRow[columnKey] = this.generateSettingColumn(newData[columnKey]);
    });
    return dataRow;
  }
  generateDataObject() {
    let dataObject: any = [];
    this.headers.forEach((header: any) => {
      const columnKey = header.columnKey;
      dataObject.push({
        key: columnKey,
        value: "",
        css: "",
        isReadOnly: false,
        isExpand: false
      });
    });

    return dataObject;
  }
  generateSettingColumn(label: any,
    css: string = '',
    style: string = '',
    isChecked: boolean = false,
    isEdit: boolean = false,
    isExpand: boolean = false,
    isReadOnly: boolean = false,
    typeInput: boolean = false,
  ) {
    let dataRow: any =
    {
      name: label,
      css: css,
      isChecked: isChecked,
      isEdit: isEdit,
      typeInput: isExpand,
      isExpand: isReadOnly,
      isReadOnly: typeInput,
      style: style
    }; // Define dataRow with the 'any' type
    return dataRow;
  }
  generateColumnKey(label: string): string {
    return label.replace(/\s+/g, '_').toLowerCase();
  }

  setData(data: any, type: any): void {
    this.type = type;
    // console.log(dataHeader);
    this.headers = []
    for (let s of data.data) {
      const index = data.data.indexOf(s);
      let freeze = true;
      let css = 'text-grey'
      let width = 200
      if (s.column_key === 'tutup_semua_bag') {
        css = 'color-red';
        width = 350;
        this.total_freeze_col = index;
      }
      if (this.total_freeze_col !== 0) {
        if (index > this.total_freeze_col) {
          freeze = false;
        }
      }

      if (s.column_key.length > 20) {
        width = 400
      }
      if (s.column_key === 'no') {
        width = 100
      }
      if (s.column_key === 'no_bag') {
        width = 130
      }
      if (s.column_key === 'berat_bag') {
        width = 130
      }
      if (s.column_key === 'resi_vendor') {
        width = 150
      }
      if (s.column_key === 'tutup_semua_bag') {
        width = 180
      }
      if (width <= 200) {
        // this.getMinusWidth += (200 - width)
      }
      // if(index)
      this.addNewHeader({ label: s.label, css: css, freeze: freeze, isFunction: freeze, width: width, columnKey: s.column_key, data: s.data })
    }

    // const newData = [{
    //   "dataExpand": [
    //     {
    //       "no": {
    //         "name": "",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "no_bag": {
    //         "name": "",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "berat_bag": {
    //         "name": "",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "resi_vendor": {
    //         "name": "725673245HG",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "tutup_semua_bag": {
    //         "name": "1",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "berat_bersih": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "desc": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "translated_desc": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "ctn": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "unit": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "custom_value": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "penerima": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "no._arc": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "no._telp": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "alamat_penerima": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "translate_alamat_penerima": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       }
    //     }
    //   ],
    //   "no": {
    //     "name": "02",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "no_bag": {
    //     "name": "757G2202",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "berat_bag": {
    //     "name": "200 Kg",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "resi_vendor": {
    //     "name": "Total 2 Resi",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "tutup_semua_bag": {
    //     "name": "QTY/RESI",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "berat_bersih": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "desc": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "translated_desc": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "ctn": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "unit": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "custom_value": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "penerima": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "no._arc": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "no._telp": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "alamat_penerima": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "translate_alamat_penerima": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   }
    // },
    // {
    //   "dataExpand": [
    //     {
    //       "no": {
    //         "name": "",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "no_bag": {
    //         "name": "",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "berat_bag": {
    //         "name": "",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "resi_vendor": {
    //         "name": "725673245HG",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "tutup_semua_bag": {
    //         "name": "1",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "berat_bersih": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "desc": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "translated_desc": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "ctn": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "unit": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "custom_value": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "penerima": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "no._arc": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "no._telp": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "alamat_penerima": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       },
    //       "translate_alamat_penerima": {
    //         "name": "100",
    //         "css": "",
    //         "isChecked": false,
    //         "isEdit": false,
    //         "typeInput": false,
    //         "isExpand": false,
    //         "isReadOnly": false,
    //         "style": ""
    //       }
    //     }
    //   ],
    //   "no": {
    //     "name": "02",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "no_bag": {
    //     "name": "757G2202",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "berat_bag": {
    //     "name": "200 Kg",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "resi_vendor": {
    //     "name": "Total 2 Resi",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "tutup_semua_bag": {
    //     "name": "QTY/RESI",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "berat_bersih": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "desc": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "translated_desc": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "ctn": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "unit": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "custom_value": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "penerima": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "no._arc": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "no._telp": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "alamat_penerima": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   },
    //   "translate_alamat_penerima": {
    //     "name": "",
    //     "css": "",
    //     "isChecked": false,
    //     "isEdit": false,
    //     "typeInput": false,
    //     "isExpand": false,
    //     "isReadOnly": false,
    //     "style": ""
    //   }
    // }]
    this.listDataTable = data.data;
    this.tempData = [...this.listDataTable];
    console.log(this.listDataTable);
    console.log('tempData', this.tempData);

    this.widthRow();
    // for (let i of data.data) {
    //   this.addNewData(i);
    // }
    // this.generateDataObject();
    // console.log(this.listDataTable);

  }
  ngAfterViewInit() {
    this.widthRow();
  }

}
