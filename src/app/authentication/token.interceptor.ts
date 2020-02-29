import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = localStorage.getItem('token');
        request = request.clone({
          setHeaders: {
            'Authorization' : `Bearer ${token}`,
            'Content-type' : 'application/json'
          }
        });    
        return next.handle(request);
    
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request)
    .pipe(catchError( (response:any) => {
      if(response instanceof HttpErrorResponse && response.status === 401){
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth');
      }
      return throwError(response);
    }));

  }
}