import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcessBagComponent } from 'src/app/Components/modal/process-bag/process-bag.component';

@Component({
  selector: 'app-daftar-bag',
  templateUrl: './daftar-bag.page.html',
  styleUrls: ['./daftar-bag.page.scss'],
})
export class DaftarBagPage implements OnInit {
  @ViewChild(ProcessBagComponent) processBagComponent?: ProcessBagComponent;

  public currentTab: string = 'Belom Diproses';
  public listTab: string[] = ['Belom Diproses', 'Draft'];
  public layout: boolean = true;
  public today = new Date();
  public listData: any[] = ['A', 'B', 'C', 'D', 'E', 'F', 'D', 'E', 'F', 'D', 'E', 'F',]
  gridData: any[] = []; // Your grid data array

  constructor() {
    // Load initial data for the grid (e.g., first page)
    this.loadInitialData();
  }

  loadInitialData() {
    // Simulate loading initial data
    setTimeout(() => {
      this.gridData = this.generateData(10); // Load 10 items initially
    }, 1000);
  }

  loadMoreData(event: any) {
    // Simulate loading more data
    setTimeout(() => {
      const newData = this.generateData(5); // Load 5 more items
      this.gridData = [...this.gridData, ...newData];
      event.target.complete();

      // Optionally, disable the infinite scroll when no more data is available
      // if (newData.length === 0) {
      //   event.target.disabled = true;
      // }
    }, 1000);
  }

  // Function to generate mock data for demonstration purposes
  generateData(count: number): any[] {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({ id: i, name: `Item ${i + 1}` });
    }
    return data;
  }
  ngOnInit() {
  }
  openBag() {
    console.log('ss');
    console.log(this.processBagComponent);
    this.processBagComponent?.modal?.present();
  }
  openHistory(){
    
  }
}
