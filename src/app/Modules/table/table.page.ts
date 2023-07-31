import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProcessBagComponent } from 'src/app/Components/modal/process-bag/process-bag.component';
import { TableExcelComponent } from 'src/app/Components/table/table-excel/table-excel.component';
import { GlobalService } from 'src/app/Services/global/global.service';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  @ViewChild(ProcessBagComponent) processBagComponent: ProcessBagComponent;
  @ViewChild(TableExcelComponent) tableComponent: TableExcelComponent;
  checkAll: boolean = false;
  showDelete: boolean = false;
  listDataDelete: any;
  formSearch: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  inputArray: any;
  data: any =
    {
      header: [
        { title: 'No', column_key: 'no', edit_able: false },
        { title: 'No Bag', column_key: 'no_bag', edit_able: false },
        { title: 'Berat Bag', column_key: 'berat_bag', edit_able: false },
        { title: 'Resi Vendor', column_key: 'resi_vendor', edit_able: false },
        { title: 'Tutup Semua Bag', column_key: 'tutup_semua_bag', edit_able: false },
        { title: 'Berat Resi', column_key: 'berat_resi', edit_able: true },
        { title: 'Desc', column_key: 'desc', edit_able: true },
        { title: 'Translated Desc', column_key: 'translated_desc', edit_able: true },
        { title: 'CTN', column_key: 'ctn', edit_able: false },
        { title: 'UNIT', column_key: 'unit', edit_able: true },
        { title: 'CUSTOME VALUE', column_key: 'custom_value', edit_able: true },
        { title: 'PENGIRIM', column_key: 'pengirim', edit_able: true },
        { title: 'PENERIMA', column_key: 'penerima', edit_able: true },
        { title: 'NO.ARC', column_key: 'no_arc', edit_able: true },
        { title: 'NO.TELP', column_key: 'no_telp', edit_able: true },
        { title: 'ALAMAT PENERIMA', column_key: 'alamat_penerima', edit_able: true },
        { title: 'TRANSLATE ALAMAT PENERIMA', column_key: 'translate_alamat_penerima', edit_able: true },

      ],
      data: [
        {
          uid: '123',
          no: '01',
          no_bag: '100001',
          resi_vendor: 'Total 2 Resi',
          berat_bag: '100 Kg',
          tutup_semua_bag: 'QTY/RESI',
          data_expand: [
            {
              uid: '12345',
              resi_vendor: '2322344',
              tutup_semua_bag: '1',
              berat_resi: '1',
              desc: '1',
              translated_desc: '1',
              ctn: '1',
              unit: 'Pack',
              custom_value: 'Pack',
              pengirim: 'Pack',
              penerima: 'Pack',
              no_arc: 'Pack',
              no_telp: 'Pack',
              alamat_penerima: 'Pack',
              translated_penerima: 'Pack',
            },
            {
              uid: '12346',
              resi_vendor: '2322345',
              tutup_semua_bag: '1',
              berat_resi: '1',
              desc: '1',
              translated_desc: '1',
              ctn: '1',
              unit: 'Pack',
              custom_value: 'Pack',
              pengirim: 'Pack',
              penerima: 'Pack',
              no_arc: 'Pack',
              no_telp: 'Pack',
              alamat_penerima: 'Pack',
              translated_penerima: 'Pack',
            },
            {
              uid: '12347',
              resi_vendor: '2322346',
              tutup_semua_bag: '1',
              berat_resi: '1',
              desc: '1',
              translated_desc: '1',
              ctn: '1',
              unit: 'Pack',
              custom_value: 'Pack',
              pengirim: 'Pack',
              penerima: 'Pack',
              no_arc: 'Pack',
              no_telp: 'Pack',
              alamat_penerima: 'Pack',
              translated_penerima: 'Pack',
            },
          ]
        },
        {
          uid: '124',
          no: '02',
          no_bag: '100002',
          resi_vendor: 'Total 2 Resi',
          berat_bag: '100 Kg',
          tutup_semua_bag: 'QTY/RESI',
          data_expand: [
            {
              uid: '12349',
              resi_vendor: '2322344',
              tutup_semua_bag: '1',
              berat_resi: '1',
              desc: '1',
              translated_desc: '1',
              ctn: '1',
              unit: 'Pack',
              custom_value: 'Pack',
              pengirim: 'Pack',
              penerima: 'Pack',
              no_arc: 'Pack',
              no_telp: 'Pack',
              alamat_penerima: 'Pack',
              translated_penerima: 'Pack',
            },
            {
              uid: '12350',
              resi_vendor: '2322345',
              tutup_semua_bag: '1',
              berat_resi: '1',
              desc: '1',
              translated_desc: '1',
              ctn: '1',
              unit: 'Pack',
              custom_value: 'Pack',
              pengirim: 'Pack',
              penerima: 'Pack',
              no_arc: 'Pack',
              no_telp: 'Pack',
              alamat_penerima: 'Pack',
              translated_penerima: 'Pack',
            },
          ]
        },


      ]
    }

  // processNestedData(baseData: any, data: any, indexCol: string = '0', indexRow: string = '0') {
  //   console.log('dataExpanddd', data);
  //   console.log('baseData', baseData);
  //   console.log('index', indexCol);
  //   console.log(this.data);
  //   console.log('sss', this.data[0].data[indexCol].data_expand)
  //   let transformedData: any = [];
  //   for (let i in this.data[0].data[indexCol].data_expand) {
  //     const headerMap = baseData.reduce((map: any, item: any) => {
  //       map[item.column_key] = "";
  //       return map;
  //     }, {});
  //     transformedData.push(headerMap);
  //     console.log('ss', transformedData);



  //     // console.log('headerMap', headerMap);
  //   }
  //   for (let i in transformedData) {
  //     for (let j of baseData) {
  //       console.log('data', j.data);
  //       // console.log('dataExpand', j.data[i].dataExpand);
  //       const headerMap = baseData.reduce((map: any, item: any) => {
  //         map[item.column_key] = "";
  //         return map;
  //       }, {});
  //       for (let k of j.data[indexCol].dataExpand) {
  //         console.log('sdsad', k);

  //         headerMap[j.column_key] = k.name;

  //       }
  //       console.log('asdsad', headerMap);

  //       transformedData[i][j.column_key] = headerMap[j.column_key];
  //     }
  //   }

  //   console.log('transformed Data', transformedData);
  //   return transformedData;
  // }
  constructor(public navService: NavigationService, public globalService: GlobalService) {
    this.formSearch.get('search')!.valueChanges.subscribe((value) => {
      // Handle the value change
      this.resetData();
      this.getData(value, false)
    });
  }

  ngOnInit() {

  }
  flattenData(data: any, parentKey: string = ''): any[] {
    const newData: any[] = [];
    data.forEach((item: any) => {
      item.parent_key = '';
      item.data_expand.forEach((data_expand: any) => {
        data_expand.parent_key = item.no_bag;
        newData.push(data_expand);
      })
      newData.push(item);
      // delete item.data_expand;
    });
    return newData;
  }

  unflattenData(flattenedData: any[]): any[] {
    const nestedData: any[] = [];

    // Group the flattened data by their parent_key
    const dataByParentKey: { [key: string]: any[] } = {};
    flattenedData.forEach((item: any) => {
      const parentKey = item.parent_key || '';
      if (!dataByParentKey[parentKey]) {
        dataByParentKey[parentKey] = [];
      }
      dataByParentKey[parentKey].push(item);
    });

    // Reconstruct the nested structure
    dataByParentKey[''].forEach((item: any) => {
      const newItem: any = { ...item };
      newItem.data_expand = dataByParentKey[item.no_bag] || [];
      nestedData.push(newItem);
    });
    nestedData.map((item: any) => {
      delete item.parent_key;
      delete item.key_parent;
    })
    return nestedData;
  }
  transformedData(data: any) {
    let transformedData: any = [];
    console.log(this.inputArray);

    for (let i in data) {
      const headerMap = this.inputArray.reduce((map: any, item: any) => {
        map[item.column_key] = "";
        return map;
      }, {});
      for (let j of this.inputArray) {
        headerMap[j.column_key] = j.data[i].name;
        headerMap.parent_key = j.data[i].parent_key;
        headerMap.key_parent = j.data[i].key_parent;
        headerMap.edit_able = j.data[i].edit_able;
        headerMap.uid = j.data[i].uid;
      }
      transformedData.push(headerMap);
    }
    return transformedData;
  }
  convertBack() {
    // let transformedData: any = [];
    // for (let i in this.inputArray[0].data) {
    //   const headerMap = this.inputArray.reduce((map: any, item: any) => {
    //     map[item.column_key] = "";
    //     return map;
    //   }, {});
    //   for (let j of this.inputArray) {
    //     headerMap[j.column_key] = j.data[i].name;
    //     headerMap.parent_key = j.data[i].parent_key;
    //     headerMap.key_parent = j.data[i].key_parent;
    //     headerMap.edit_able = j.data[i].edit_able;
    //     // headerMap.dataExpand = this.processNestedData(inputArray[0], j.data[i].dataExpand,i,j.column_key);
    //   }
    //   transformedData.push(headerMap);
    // }
    let transformedData: any = this.transformedData(this.inputArray.data);
    const originalData = this.unflattenData(transformedData);
    this.data = originalData;
    console.log('originalData', originalData);
  }
  setData() {
    let flattenedData: any = {}
    const newHeader = this.data.header.map((headerItem: any) => ({ ...headerItem, name: headerItem.title }));
    const newData = this.flattenData(this.data.data);
    flattenedData = { header: newHeader, data: newData };

    // let inputArray: any = {}
    // Map over each header item and return a new object for each
    this.inputArray = flattenedData.header.map((headerItem: any) => ({
      label: headerItem.title,
      freeze: false,
      width: 100, // Change this value as needed
      css: 'text-grey', // Change this value as needed
      expand: false,
      column_key: headerItem.column_key,
      uid: headerItem.uid,
      data: flattenedData.data.map((dataItem: any) => ({
        edit_able: headerItem.edit_able && dataItem[headerItem.column_key] ? headerItem.edit_able : false,
        parent_key: dataItem.parent_key || '',
        key_parent: dataItem.no_bag || '',
        name: dataItem[headerItem.column_key] || '',
        tempData: dataItem[headerItem.column_key],
        uid: dataItem.uid,
        css: 'text-grey', // Change this value as needed
        isChecked: false,
        isEmpty: false,
        open_edit: false,
        id: '1', // Change this value as needed
        typeInput: 'text', // Change this value as needed
        isExpand: false,
        isReadOnly: true,
        // dataExpand: dataItem.data_expand.map((expandItem: any) => ({
        //   name: expandItem[headerItem.column_key],
        //   css: 'text-grey', // Change this value as needed
        //   isChecked: false,
        //   isEmpty: false,
        //   isEdit: false,
        //   id: '1', // Change this value as needed
        //   typeInput: 'text', // Change this value as needed
        //   isExpand: false,
        //   isReadOnly: true,
        // }))
      }))
    }));

    // Initialize the result object
    const result: any = {
      header: [],
      data: []
    };

    // Convert header information
    const headerInfo = this.inputArray.map((item: any) => ({
      title: item.label,
      column_key: item.column_key,
    }));
    console.log(this.data);
    // let transformedData: any = [];
    // for (let i in inputArray[0].data) {
    //   const headerMap = inputArray.reduce((map: any, item: any) => {
    //     map[item.column_key] = "";
    //     return map;
    //   }, {});
    //   for (let j of inputArray) {
    //     headerMap[j.column_key] = j.data[i].name;
    //     headerMap.parent_key = j.data[i].parent_key;
    //     headerMap.key_parent = j.data[i].key_parent;
    //     headerMap.edit_able = j.data[i].edit_able;
    //     // headerMap.dataExpand = this.processNestedData(inputArray[0], j.data[i].dataExpand,i,j.column_key);
    //   }
    //   transformedData.push(headerMap);
    // }
    // const originalData = this.unflattenData(transformedData);
    // console.log('originalData', originalData);

    result.header = headerInfo;
    result.data = this.inputArray;
    this.tableComponent?.setData(result)
  }
  ngAfterViewInit() {
    this.setData()
  }
  goToHome() {
    this.navService.toDashboardPage();
  }
  goToSubTitlePage() {
  }
  resetData() {

  }
  getData(val: string, isLoading: boolean = true) {

  };
  goToTitlePage() {

  }
  checkAllData() {
    this.tableComponent.listDataTable[0].data.map((data: any) => {
      data.isChecked = !this.checkAll;
    })
  }
  addData() {
    this.processBagComponent?.modal?.present();
  }
  addDataTable(val: any) {
    this.data.data.push({
      uid: '12345',
      no: '03',
      no_bag: '100003',
      resi_vendor: 'Total 2 Resi',
      berat_bag: '100 Kg',
      tutup_semua_bag: 'QTY/RESI',
      data_expand: [
        {
          uid: '12352',
          resi_vendor: '2322344',
          tutup_semua_bag: '1',
          berat_resi: '1',
          desc: '1',
          translated_desc: '1',
          ctn: '1',
          unit: 'Pack',
          custom_value: 'Pack',
          pengirim: 'Pack',
          penerima: 'Pack',
          no_arc: 'Pack',
          no_telp: 'Pack',
          alamat_penerima: 'Pack',
          translated_penerima: 'Pack',
        },
        {
          uid: '12351',
          resi_vendor: '2322345',
          tutup_semua_bag: '1',
          berat_resi: '1',
          desc: '1',
          translated_desc: '1',
          ctn: '1',
          unit: 'Pack',
          custom_value: 'Pack',
          pengirim: 'Pack',
          penerima: 'Pack',
          no_arc: 'Pack',
          no_telp: 'Pack',
          alamat_penerima: 'Pack',
          translated_penerima: 'Pack',
        },
      ]
    },)
    this.setData()
    this.globalService.showToast('Data berhasil ditambah', 'success')
  }
  showDeleteButton(data: any) {
    const dataChecklist = data.filter((item: any) =>
      item.isChecked
    )
    this.listDataDelete = dataChecklist;
    if (dataChecklist.length > 0) {
      return this.showDelete = true
    }
    return this.showDelete = false;
  }
  deleteData() {
    let listData: any = [this.data.data];
    this.listDataDelete.map((item: any) => {
      this.data.data.map((item2: any) => {
        item2.data_expand = item2.data_expand.filter((itemChild: any) => !this.listDataDelete.some((deleteItem: any) => deleteItem.uid === itemChild.uid));
        return item2;
      });
      this.data.data = this.data.data.filter((data: any) => data.uid !== item.uid && data.data_expand.length > 0);
    });
    this.setData()
    this.globalService.showToast('Berhasil hapus data', 'danger')
  }
}
