import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtmPage } from './ctm.page';

describe('CtmPage', () => {
  let component: CtmPage;
  let fixture: ComponentFixture<CtmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CtmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
