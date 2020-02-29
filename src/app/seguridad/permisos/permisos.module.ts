import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";

import { PermisosRoutingModule } from './permisos-routing.module';
import { IndexComponent } from './index/index.component';
import { PermisoDialogComponent } from './permiso-dialog/permiso-dialog.component';


@NgModule({
  declarations: [IndexComponent, PermisoDialogComponent],
  entryComponents: [
    PermisoDialogComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,
    SharedModule
  ]
})
export class PermisosModule { }
