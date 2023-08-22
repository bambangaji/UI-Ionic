import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailManifestBagPage } from './detail-manifest-bag.page';

describe('DetailManifestBagPage', () => {
  let component: DetailManifestBagPage;
  let fixture: ComponentFixture<DetailManifestBagPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailManifestBagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
