import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";

import { GruposRoutingModule } from './grupos-routing.module';
import { IndexComponent } from './index/index.component';
import { GrupoDialogComponent } from './grupo-dialog/grupo-dialog.component';


@NgModule({
  declarations: [IndexComponent, GrupoDialogComponent],
  entryComponents: [
    GrupoDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GruposRoutingModule
  ]
})
export class GruposModule { }
