import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateManifestPage } from './create-manifest.page';

describe('CreateManifestPage', () => {
  let component: CreateManifestPage;
  let fixture: ComponentFixture<CreateManifestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateManifestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
