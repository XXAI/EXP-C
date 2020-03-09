import { DataSource } from '@angular/cdk/table';
import { Usuario } from './usuario';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class UsuariosDataSource implements DataSource<Usuario> {
    
    private dataSubject = new BehaviorSubject<Usuario[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public length:number = 0;
    constructor(private apiService: UsuariosService){}

    connect(collectionViewer: CollectionViewer):Observable<Usuario[]>{
        return this.dataSubject.asObservable();
    }

    disconnect( collectionViewer: CollectionViewer){
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    loadData(filter = '', sortDirection = 'asc', orderBy ='', pageIndex = 0, pageSize = 3){
       
        this.loadingSubject.next(true);
        this.apiService.buscar(filter, sortDirection, orderBy, pageIndex + 1, pageSize)
        .pipe(
            catchError(()=> of ([])),
            finalize( () => this.loadingSubject.next(false) )
        ).subscribe((response) => { this.length = response.total; this.dataSubject.next(response.data)});
    }
}