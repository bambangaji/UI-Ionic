import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss'],
})
export class ChartDashboardComponent implements OnInit {
  @ViewChild('dynamicChart', { static: false }) dynamicChart: ElementRef | undefined;

  value1: number = 10;
  value2: number = 5;
  value3: number = 40;
  value4: number = 50;

  chart?: Chart;
  isPageReady: boolean = false;

  ngOnInit() {
    this.loadPage();
  }
  constructor(public elementRef: ElementRef) { }
  async loadPage() {
    this.dynamicChart = this.elementRef.nativeElement.querySelector('#dynamicChart');

    Chart.register(...registerables);
    await this.createChart();
    this.isPageReady = true;
  }

  async createChart() {
    this.chart = new Chart(this.elementRef.nativeElement.querySelector('#dynamicChart'), {
      type: 'bar',
      data: {
        labels: ['Singapore', 'Australia', 'India'],
        datasets: [
          {
            label: 'Dibatalkan',
            data: [this.value1, this.value2, this.value3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 99, 132, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderRadius: 100,
            barThickness: 10,
            borderWidth: 1,
            stack: 'stack 0'
          },
          {
            label: 'Berangkat',
            data: [40, this.value2, this.value3],
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderRadius: 100,
            barThickness: 10,
            borderWidth: 1,
            stack: 'stack 0'
          }
        ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 100,
            type: 'linear',
            beginAtZero: true,
            stacked: true,
            ticks: {
              callback: function (val, index) {
                // Hide every 2nd tick label
                console.log(val);
                return index % 2 === 0 ? this.getLabelForValue(parseInt(val.toString())) : '';
              },
            }
          },
          x: {
            stacked: true,
            // type: 'linear',
            // beginAtZero: true,
            // ticks: {
            //   callback: function (val, index) {
            //     // Hide every 2nd tick label
            //     console.log(val);
            //     return index % 2 === 0 ? this.getLabelForValue(parseInt(val.toString())) : '';
            //   },
            // }
          }
        }
      },
    });
  }

  updateChart() {
    this.chart!.data.datasets[0].data = [this.value1, this.value2, this.value3];
    this.chart!.update();
  }


}
