import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from 'src/app/Services/global/global.service';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Input() imageSrc: string = '';
  @Input() label?: string;
  @Input() isReadonly: boolean = false;
  @Output() imageSelected = new EventEmitter<string>();

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }
  async onChange(event: any) {
    const img64 = await this.globalService.convertBlobToBase64WithValidation(event);
    this.imageSrc = img64;
    this.emitValue();
  }
  uploadImage(): void {
    if (!this.isReadonly) {
      document.getElementById(this.label!)?.click();

    }
  }
  private emitValue() {
    this.imageSelected.emit(this.imageSrc);
  }
}
