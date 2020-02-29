import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule  } from '../material/material.module';
import { AppsDialogComponent } from './apps-dialog/apps-dialog.component';
import { RouterModule } from '@angular/router';
import { AppsButtonComponent } from './apps-button/apps-button.component';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { AccountButtonComponent } from './account-button/account-button.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [AppsDialogComponent, AppsButtonComponent, AccountDialogComponent, AccountButtonComponent, ConfirmDialogComponent],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [    
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,

    // Components
    AppsButtonComponent,
    AccountButtonComponent
  ]
})
export class SharedModule { }
