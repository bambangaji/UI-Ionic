import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenerbanganDetailPage } from './penerbangan-detail.page';

describe('PenerbanganDetailPage', () => {
  let component: PenerbanganDetailPage;
  let fixture: ComponentFixture<PenerbanganDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PenerbanganDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
