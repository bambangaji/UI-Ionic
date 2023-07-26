import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaftarBagPage } from './daftar-bag.page';

describe('DaftarBagPage', () => {
  let component: DaftarBagPage;
  let fixture: ComponentFixture<DaftarBagPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DaftarBagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
