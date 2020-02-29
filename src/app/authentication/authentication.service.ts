import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private router:Router) { }

  auth(username: string, password:string):Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-type','application/json');
    var api: string = environment.api;
    return this.http.post(`${api}/authenticate`,{username: username, password:password}, {headers})
    .pipe(
      map((response) => {
        let json:any = response;
        localStorage.setItem('token',json.token);
        return json;
      })
    );
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }
}
