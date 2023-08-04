import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalKeberangkatanComponent } from './modal-keberangkatan.component';

describe('ModalKeberangkatanComponent', () => {
  let component: ModalKeberangkatanComponent;
  let fixture: ComponentFixture<ModalKeberangkatanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKeberangkatanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalKeberangkatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
