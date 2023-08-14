import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenerbanganPage } from './penerbangan.page';

describe('PenerbanganPage', () => {
  let component: PenerbanganPage;
  let fixture: ComponentFixture<PenerbanganPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PenerbanganPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
