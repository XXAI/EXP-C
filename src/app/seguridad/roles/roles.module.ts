import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";

import { RolesRoutingModule } from './roles-routing.module';
import { IndexComponent } from './index/index.component';
import { RolDialogComponent } from './rol-dialog/rol-dialog.component';


@NgModule({
  declarations: [IndexComponent, RolDialogComponent],
  entryComponents: [
    RolDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
