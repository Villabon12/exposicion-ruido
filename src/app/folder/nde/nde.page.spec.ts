import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NdePage } from './nde.page';

describe('NdePage', () => {
  let component: NdePage;
  let fixture: ComponentFixture<NdePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NdePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
