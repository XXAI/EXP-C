import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsButtonComponent } from './apps-button.component';

describe('AppsButtonComponent', () => {
  let component: AppsButtonComponent;
  let fixture: ComponentFixture<AppsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
