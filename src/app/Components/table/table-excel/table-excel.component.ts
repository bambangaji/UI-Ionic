import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IHeader, ITableHeader } from 'src/app/Interfaces/index.interface';

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
  listData: ITableHeader[];
  listDataTable: any = [];
  data: ITableHeader;
  getWidthRow: string = '';
  total_freeze_col: number = 0;
  isMinimized: boolean = false;
  headers = [
    {
      label: "No",
      freeze: true,
      width: 100,
      css: "text-grey",
      function: false,
      columnKey: "no"
    },
    {
      label: "No.BAG",
      freeze: true,
      width: 200,
      css: "text-grey",
      function: false,
      columnKey: "no_bag"
    },
    {
      label: "BERAT BAG",
      freeze: true,
      width: 200,
      css: "text-grey",
      function: false,
      columnKey: "berat_bag"
    },
    {
      label: "RESI VENDOR",
      freeze: true,
      width: 200,
      css: "text-grey",
      function: false,
      columnKey: "resi_vendor"
    },
    {
      label: "TUTUP SEMUA BAG",
      freeze: true,
      width: 200,
      css: "color-red",
      function: true,
      columnKey: "tutup_semua_bag"
    },
  ];
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
      const left = index * width - this.headers[0].width!;
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
    this.isMinimized = !this.isMinimized;
    value.label = this.isMinimized ? "BUKA SEMUA BAG" : "TUTUP SEMUA BAG"
  }
  checkboxExpand(value: any, index: number, j: number) {
    if (value.dataExpand !== undefined) {

      value.dataExpand.map((item: any) => {
        item.isChecked = !value.isChecked;
      })
    } else {

      // console.log(value);

      let countChecked = 0;
      for (let i of this.listData[j]!.data![index].dataExpand) {
        if (i.isChecked) {
          countChecked++;
        }
      }
      // console.log(countChecked);

      if (countChecked === this.listData[j]!.data![index].dataExpand.length) {
        this.listData[j]!.data![index].isChecked = true;
      } else {
        this.listData[j]!.data![index].isChecked = false;
      }
      value.isChecked = !value.isChecked;
    }
  }
  addNewHeader(settings: { label: string, freeze: boolean, width: number, css: string, funtion: boolean }) {
    const {
      label = 'New Header',
      freeze = false,
      width = 200,
      css = '',
      funtion = false
    } = settings;

    const newHeader = {
      label: label,
      freeze: freeze, // Adjust the properties as needed for the new header
      width: width,
      css: css,
      function: funtion,
      columnKey: this.generateColumnKey(label)
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
    
    for (let j of newData.dataExpand) {
      // console.log(j);

      const data = this.generateDataExpand(j)
      dataExpand.push(data);
    }
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
    console.log(dataObject);

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

  setData(dataHeader: IHeader[], dataRow: any): void {
    // console.log(dataHeader);

    for (let s of dataHeader) {
      this.addNewHeader({ label: s.label, css: s.css!, freeze: s.freeze!, funtion: s.function!, width: s.width! })
    }
    const newData = [{
      "dataExpand": [
        {
          "no": {
            "name": "",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "no_bag": {
            "name": "",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "berat_bag": {
            "name": "",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "resi_vendor": {
            "name": "725673245HG",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "tutup_semua_bag": {
            "name": "1",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "berat_bersih": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "desc": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "translated_desc": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "ctn": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "unit": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "custom_value": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "penerima": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "no._arc": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "no._telp": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "alamat_penerima": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "translate_alamat_penerima": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          }
        }
      ],
      "no": {
        "name": "02",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "no_bag": {
        "name": "757G2202",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "berat_bag": {
        "name": "200 Kg",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "resi_vendor": {
        "name": "Total 2 Resi",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "tutup_semua_bag": {
        "name": "QTY/RESI",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "berat_bersih": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "desc": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "translated_desc": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "ctn": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "unit": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "custom_value": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "penerima": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "no._arc": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "no._telp": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "alamat_penerima": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "translate_alamat_penerima": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      }
    },
    {
      "dataExpand": [
        {
          "no": {
            "name": "",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "no_bag": {
            "name": "",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "berat_bag": {
            "name": "",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "resi_vendor": {
            "name": "725673245HG",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "tutup_semua_bag": {
            "name": "1",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "berat_bersih": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "desc": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "translated_desc": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "ctn": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "unit": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "custom_value": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "penerima": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "no._arc": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "no._telp": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "alamat_penerima": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          },
          "translate_alamat_penerima": {
            "name": "100",
            "css": "",
            "isChecked": false,
            "isEdit": false,
            "typeInput": false,
            "isExpand": false,
            "isReadOnly": false,
            "style": ""
          }
        }
      ],
      "no": {
        "name": "02",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "no_bag": {
        "name": "757G2202",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "berat_bag": {
        "name": "200 Kg",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "resi_vendor": {
        "name": "Total 2 Resi",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "tutup_semua_bag": {
        "name": "QTY/RESI",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "berat_bersih": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "desc": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "translated_desc": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "ctn": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "unit": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "custom_value": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "penerima": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "no._arc": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "no._telp": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "alamat_penerima": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      },
      "translate_alamat_penerima": {
        "name": "",
        "css": "",
        "isChecked": false,
        "isEdit": false,
        "typeInput": false,
        "isExpand": false,
        "isReadOnly": false,
        "style": ""
      }
    }]
    this.widthRow();
    for (let i of newData) {
      this.addNewData(i);
    }
    // this.generateDataObject();
    // console.log(this.listDataTable);
    
  }
  ngAfterViewInit() {

    this.listData = [
      {
        label: 'No',
        freeze: true,
        width: 100,
        css: 'text-grey',
        expand: false,
        column_key:'no',
        data: [
          {
            name: '01',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '02',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '03',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          }
        ]
      },
      {
        label: 'No.BAG',
        freeze: true,
        width: 200,
        css: 'text-grey',
        expand: false,
        column_key:'no_bag',
        data: [
          {
            name: '757G2200',
            css: 'color-red',
            style: 'color-red',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '757G2200',
            css: 'color-red',
            style: 'color-red',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '757G2200',
            css: 'color-red',
            style: 'color-red',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          }
        ]
      },
      {
        label: 'BERAT BAG',
        freeze: true,
        width: 200,
        css: 'text-grey',
        expand: false,
        column_key:'berat_bag',
        data: [
          {
            name: '100 Kg',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '100 Kg',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '100 Kg',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'RESI VENDOR',
        freeze: true,
        width: 200,
        css: 'text-grey',
        expand: false,
        column_key: 'resi_vendor',
        data: [
          {
            name: 'Total Resi 2',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '20220500732 ',
                css: 'bold-text text-dark',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'T20220500732',
                css: 'bold-text text-dark',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: 'Total Resi 2',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '20220500732 ',
                css: 'bold-text text-dark',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'T20220500732',
                css: 'bold-text text-dark',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: 'Total Resi 2',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '20220500732 ',
                css: 'bold-text text-dark',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'T20220500732',
                css: 'bold-text text-dark',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'TUTUP SEMUA BAG',
        freeze: true,
        width: 200,
        css: 'color-red pointer',
        expand: false,
        function: true,
        data: [
          {
            name: 'QTY / RESI',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              },
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              }
            ]
          },
          {
            name: 'QTY / RESI',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              },
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              }
            ]
          },
          {
            name: 'QTY / RESI',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              },
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              }
            ]
          },
        ]
      },
      {
        label: 'BERAT RESI',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: true,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1.0',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              },
              {
                name: '1.0',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              }
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: true,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1.0',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              },
              {
                name: '1.0',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              }
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: true,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1.0',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              },
              {
                name: '1.0',
                css: 'text-grey',
                isChecked: false,
                isEmpty: true,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true
              }
            ]
          },
        ]
      },
      {
        label: 'DESC',
        freeze: false,
        width: 500,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'BAJU PAKAIAN / VITAMIN / SUPPLEMENT/ SNACK',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'BAJU PAKAIAN / VITAMIN / SUPPLEMENT/ SNACK',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'BAJU PAKAIAN / VITAMIN / SUPPLEMENT/ SNACK',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'BAJU PAKAIAN / VITAMIN / SUPPLEMENT/ SNACK',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'BAJU PAKAIAN / VITAMIN / SUPPLEMENT/ SNACK',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'BAJU PAKAIAN / VITAMIN / SUPPLEMENT/ SNACK',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'TRANSLATED DESC',
        freeze: false,
        width: 500,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [{
              name: '/ 衣服 / 維生素 / 補充品 / 零食 / 烹飪香料',
              css: 'text-grey',
              isChecked: false,
              isEmpty: false,
              isEdit: true,
              id: '1',
              typeInput: 'text',
              isExpand: false,
              isReadOnly: true,
            },
            {
              name: '/ 衣服 / 維生素 / 補充品 / 零食 / 烹飪香料',
              css: 'text-grey',
              isChecked: false,
              isEmpty: false,
              isEdit: true,
              id: '1',
              typeInput: 'text',
              isExpand: false,
              isReadOnly: true,
            },]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [{
              name: '/ 衣服 / 維生素 / 補充品 / 零食 / 烹飪香料',
              css: 'text-grey',
              isChecked: false,
              isEmpty: false,
              isEdit: true,
              id: '1',
              typeInput: 'text',
              isExpand: false,
              isReadOnly: true,
            },
            {
              name: '/ 衣服 / 維生素 / 補充品 / 零食 / 烹飪香料',
              css: 'text-grey',
              isChecked: false,
              isEmpty: false,
              isEdit: true,
              id: '1',
              typeInput: 'text',
              isExpand: false,
              isReadOnly: true,
            },]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [{
              name: '/ 衣服 / 維生素 / 補充品 / 零食 / 烹飪香料',
              css: 'text-grey',
              isChecked: false,
              isEmpty: false,
              isEdit: true,
              id: '1',
              typeInput: 'text',
              isExpand: false,
              isReadOnly: true,
            },
            {
              name: '/ 衣服 / 維生素 / 補充品 / 零食 / 烹飪香料',
              css: 'text-grey',
              isChecked: false,
              isEmpty: false,
              isEdit: true,
              id: '1',
              typeInput: 'text',
              isExpand: false,
              isReadOnly: true,
            },]
          },
        ]
      },
      {
        label: 'CTN',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '1',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: false,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'UNIT',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Pack',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Pack',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Pack',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Pack',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Pack',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Pack',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'CUSTOM VALUE',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '82',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '82',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '82',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '82',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: '82',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: '82',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'PENGIRIM',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'PENERIMA',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'No ARC',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]

          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]

          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]

          },
        ]
      },
      {
        label: 'No TELP',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'ALAMAT PENERIMA',
        freeze: false,
        width: 200,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
      {
        label: 'TRANSLATE ALAMAT PENERIMA',
        freeze: false,
        width: 350,
        css: 'text-grey',
        expand: false,
        data: [
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
          {
            name: '',
            css: 'text-grey',
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1',
            typeInput: 'text',
            isExpand: false,
            isReadOnly: true,
            dataExpand: [
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
              {
                name: 'Advent ***',
                css: 'text-grey',
                isChecked: false,
                isEmpty: false,
                isEdit: true,
                id: '1',
                typeInput: 'text',
                isExpand: false,
                isReadOnly: true,
              },
            ]
          },
        ]
      },
    ]
    this.widthRow();
  }

}
