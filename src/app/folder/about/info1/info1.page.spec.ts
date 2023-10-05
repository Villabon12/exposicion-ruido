import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Info1Page } from './info1.page';

describe('Info1Page', () => {
  let component: Info1Page;
  let fixture: ComponentFixture<Info1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Info1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
