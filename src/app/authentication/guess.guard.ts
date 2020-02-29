import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuessGuard implements CanLoad {
  constructor(private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem('token')){
        this.router.navigate(['/pacientes']);
        return false;
      }
    return true;
  }
  
}
