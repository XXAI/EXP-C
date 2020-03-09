import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { IndexComponent } from './index/index.component';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [IndexComponent, UsuarioDialogComponent],
  entryComponents: [
    UsuarioDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
