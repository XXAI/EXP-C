import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoDialogComponent } from './grupo-dialog.component';

describe('GrupoDialogComponent', () => {
  let component: GrupoDialogComponent;
  let fixture: ComponentFixture<GrupoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
