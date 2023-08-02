import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegulasiPage } from './regulasi.page';

describe('RegulasiPage', () => {
  let component: RegulasiPage;
  let fixture: ComponentFixture<RegulasiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegulasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
