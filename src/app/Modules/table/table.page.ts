import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableExcelComponent } from 'src/app/Components/table/table-excel/table-excel.component';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  @ViewChild(TableExcelComponent) tableComponent: TableExcelComponent;
  checkAll: boolean = false;
  formSearch: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  data: any = [
    {
      header: [
        { title: 'No', column_key: 'no' },
        { title: 'No Bag', column_key: 'no_bag' },
        { title: 'Berat Bag', column_key: 'berat_bag' },
        { title: 'Resi Vendor', column_key: 'resi_vendor' },

      ],
      data: [
        {
          no: 'No 1',
          no_bag: '3247326473',
          resi_vendor: 'Total 2 Resi',
          berat_bag: '100 Kg',
          data_expand: [
            {
              no: '1',
              no_bag: '223',
              resi_vendor: '2322344',
              berat_bag: '',
            },
            {
              no: '2',
              no_bag: '',
              resi_vendor: '22002344',
              berat_bag: '',
            },
          ]
        },
        {
          no: 'No 2',
          no_bag: '3247326473',
          resi_vendor: 'Total 3 Resi',
          berat_bag: '1002 Kg',
          data_expand: [
            {
              no: '3',
              no_bag: '2',
              resi_vendor: '2000299344',
              berat_bag: '',
            },
            {
              no: '4',
              no_bag: '2',
              resi_vendor: '2000299343',
              berat_bag: '',
            },
            {
              no: '5',
              no_bag: '2',
              resi_vendor: '2000299345',
              berat_bag: '',
            },
          ]
        },

      ]
    }
  ]

  processNestedData(baseData: any, data: any, indexCol: string = '0', indexRow: string = '0') {
    console.log('dataExpanddd', data);
    console.log('baseData', baseData);
    console.log('index', indexCol);
    console.log(this.data);
    console.log('sss', this.data[0].data[indexCol].data_expand)
    let transformedData: any = [];
    for (let i in this.data[0].data[indexCol].data_expand) {
      const headerMap = baseData.reduce((map: any, item: any) => {
        map[item.column_key] = "";
        return map;
      }, {});
      transformedData.push(headerMap);
      console.log('ss', transformedData);



      // console.log('headerMap', headerMap);
    }
    for (let i in transformedData) {
      for (let j of baseData) {
        console.log('data', j.data);
        // console.log('dataExpand', j.data[i].dataExpand);
        const headerMap = baseData.reduce((map: any, item: any) => {
          map[item.column_key] = "";
          return map;
        }, {});
        for (let k of j.data[indexCol].dataExpand) {
          console.log('sdsad', k);

          headerMap[j.column_key] = k.name;

        }
        console.log('asdsad',headerMap);
        
        transformedData[i][j.column_key]=headerMap[j.column_key];
      }
    }

    console.log('transformed Data', transformedData);
    return transformedData;
  }
  constructor(public navService: NavigationService) {
    this.formSearch.get('search')!.valueChanges.subscribe((value) => {
      // Handle the value change
      this.resetData();
      this.getData(value, false)
    });
  }

  ngOnInit() {

  }
  ngAfterViewInit() {

    let row: any[] = [];

    let inputArray = this.data.map((item: any) => {
      // Map over each header item and return a new object for each
      let headerItems = item.header.map((headerItem: any) => ({
        label: headerItem.title,
        freeze: true,
        width: 100, // Change this value as needed
        css: 'text-grey', // Change this value as needed
        expand: false,
        column_key: headerItem.column_key,
        data: item.data.map((dataItem: any) => ({
          name: dataItem[headerItem.column_key],
          css: 'text-grey', // Change this value as needed
          isChecked: false,
          isEmpty: false,
          isEdit: false,
          id: '1', // Change this value as needed
          typeInput: 'text', // Change this value as needed
          isExpand: false,
          isReadOnly: true,
          dataExpand: dataItem.data_expand.map((expandItem: any) => ({
            name: expandItem[headerItem.column_key],
            css: 'text-grey', // Change this value as needed
            isChecked: false,
            isEmpty: false,
            isEdit: false,
            id: '1', // Change this value as needed
            typeInput: 'text', // Change this value as needed
            isExpand: false,
            isReadOnly: true,
          }))
        }))
      }));

      return headerItems;
    });
    console.log(inputArray[0]);
    console.log(this.data);
    // Initialize the result object
    const result: any = {
      header: [],
      data: []
    };

    // Convert header information
    const headerInfo = inputArray[0].map((item: any) => ({
      title: item.label,
      column_key: item.column_key,
    }));

    let transformedData: any = [];

    // const headerMap = inputArray[0].reduce((map: any, item: any) => {
    //   map[item.column_key] = '';
    //   return map;
    // }, {});
    // headerMap.dataExpand = [];
    // console.log(headerMap);
    for (let i in inputArray[0][0].data) {
      const headerMap = inputArray[0].reduce((map: any, item: any) => {
        map[item.column_key] = "";
        return map;
      }, {});
      let dataExpand: any;
      for (let j of inputArray[0]) {
        headerMap[j.column_key] = j.data[i].name;
        // headerMap.dataExpand = this.processNestedData(inputArray[0], j.data[i].dataExpand,i,j.column_key);
      }
      headerMap.dataExpand = this.processNestedData(inputArray[0], inputArray[0][0].data, i);

      transformedData.push(headerMap);
    }
    // transformedData.map((item: any, i: any) => {
    //   item.dataExpand = this.processNestedData(inputArray[0], inputArray[0][2]);
    // })

    console.log(transformedData);
    // Output the converted result
    // console.log(JSON.stringify(result, null, 2));
    result.header = headerInfo;
    result.data = transformedData;
    console.log(result);
    console.log(this.data);


    this.tableComponent?.setData([
      {
        label: 'Berat Bersih',
        css: 'text-grey',
        freeze: false,
        width: 200,
        function: false,

      },
      {
        label: 'DESC',
        css: 'text-grey',
        freeze: false,
        width: 400,
        function: false,

      },
      {
        label: 'TRANSLATED DESC',
        css: 'text-grey',
        freeze: false,
        width: 400,
        function: false,

      },
      {
        label: 'CTN',
        css: 'text-grey',
        freeze: false,
        width: 100,
        function: false,

      },
      {
        label: 'UNIT',
        css: 'text-grey',
        freeze: false,
        width: 200,
        function: false,

      },
      {
        label: 'CUSTOM VALUE',
        css: 'text-grey',
        freeze: false,
        width: 200,
        function: false,
      },
      {
        label: 'PENERIMA',
        css: 'text-grey',
        freeze: false,
        width: 200,
        function: false,
      },
      {
        label: 'NO. ARC',
        css: 'text-grey',
        freeze: false,
        width: 200,
        function: false,
      },
      {
        label: 'NO. TELP',
        css: 'text-grey',
        freeze: false,
        width: 200,
        function: false,
      },
      {
        label: 'ALAMAT PENERIMA',
        css: 'text-grey',
        freeze: false,
        width: 400,
        function: false,
      },
      {
        label: 'TRANSLATE ALAMAT PENERIMA',
        css: 'text-grey',
        freeze: false,
        width: 400,
        function: false,
      },
    ], [])
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
    this.tableComponent.listData.map((data) => {
      data.data?.map((data2) => {
        data2.isChecked = !this.checkAll;
        data2.dataExpand.map((data3: any) => {
          data3.isChecked = !this.checkAll
        })
      })
    })
  }
}
