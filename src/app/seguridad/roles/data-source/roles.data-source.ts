import { DataSource } from '@angular/cdk/table';
import { Rol } from './rol';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RolesService } from './roles.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class RolesDataSource implements DataSource<Rol> {
    
    private dataSubject = new BehaviorSubject<Rol[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public length:number = 0;
    constructor(private apiService: RolesService){}

    connect(collectionViewer: CollectionViewer):Observable<Rol[]>{
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
        ).subscribe((reponse) => { this.length = reponse.total; this.dataSubject.next(reponse.data)});
    }
}