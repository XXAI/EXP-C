import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenGuard } from './authentication/token.guard';
import { GuessGuard } from './authentication/guess.guard';


const routes: Routes = [
  {
    path: '',pathMatch:'full', redirectTo: '/auth'
  },
  {   
    path: 'pacientes',
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
    canLoad: [TokenGuard]
  },
  {   
    path: 'seguridad',
    loadChildren: () => import('./seguridad/seguridad.module').then(m => m.SeguridadModule),
    canLoad: [TokenGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), 
    canLoad: [GuessGuard]
  },
  { 
    path:'**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
