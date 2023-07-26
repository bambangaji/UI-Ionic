import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JadwalPage } from './jadwal.page';

describe('JadwalPage', () => {
  let component: JadwalPage;
  let fixture: ComponentFixture<JadwalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JadwalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
