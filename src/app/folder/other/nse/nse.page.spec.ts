import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsePage } from './nse.page';

describe('NsePage', () => {
  let component: NsePage;
  let fixture: ComponentFixture<NsePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
