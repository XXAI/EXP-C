import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',pathMatch:'full', redirectTo: '/seguridad/permisos'
  },
  {   
    path: 'permisos',
    loadChildren: () => import('./permisos/permisos.module').then(m => m.PermisosModule) 
  },
  {   
    path: 'grupos',
    loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule) 
  },
  {   
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
