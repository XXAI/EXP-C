import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDialogComponent } from './apps-dialog.component';

describe('AppsDialogComponent', () => {
  let component: AppsDialogComponent;
  let fixture: ComponentFixture<AppsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
