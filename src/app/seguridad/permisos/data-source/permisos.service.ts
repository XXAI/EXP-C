import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private api: string
  constructor(private http:HttpClient ) {
    this.api = environment.api;
   }
  
  buscar(filter = '', sortOrder = 'asc', orderBy = '', pageNumber=0, pageSize = 3): Observable<any>{
    
    return this.http.get(`${this.api}/permisos`,{
      params: new HttpParams()
        .set('filter',filter)
        .set('sortOrder',sortOrder)
        .set('orderBy',orderBy)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }
  crear(object: any):Observable<any>{
    return this.http.post(`${this.api}/permisos`,object);
  }

  editar(id:string, object: any):Observable<any>{
    return this.http.put(`${this.api}/permisos/${id}`,object);
  }

  borrar(id:string):Observable<any>{
    return this.http.delete(`${this.api}/permisos/${id}`);
  }
  grupos():Observable<any>{
    return this.http.get(`${this.api}/grupos-permisos`,{
      params: new HttpParams()
        .set('all',"1")
    });
  }
}
