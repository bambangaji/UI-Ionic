import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent  implements OnInit {
  date: any = "00:00";
  constructor(private popoverController:PopoverController) { }

  ngOnInit() { }

  confirm(p: any) {
    console.log(p);
    this.popoverController.dismiss(p)
  }
  set(p:any){
    console.log(p);
    
  }
}
