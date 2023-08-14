import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulePenerbanganPage } from './schedule-penerbangan.page';

describe('SchedulePenerbanganPage', () => {
  let component: SchedulePenerbanganPage;
  let fixture: ComponentFixture<SchedulePenerbanganPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchedulePenerbanganPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
