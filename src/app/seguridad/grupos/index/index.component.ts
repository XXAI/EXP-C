import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomMatPaginatorIntl } from 'src/app/material/custom-mat-paginator-intl';

import {MatDialog} from '@angular/material/dialog';
import { GruposDataSource } from '../data-source/grupos.data-source';
import { GruposService } from '../data-source/grupos.service';
import { tap } from 'rxjs/operators';
import { MatSort } from '@angular/material';
import { merge } from 'rxjs';
import { GrupoDialogComponent } from '../grupo-dialog/grupo-dialog.component';
import { Grupo } from '../model/grupo';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomMatPaginatorIntl() }
  ]
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  

  
  modulePath:string = "/seguridad";
  private orderBy:string;
  inputSearchTxt:string = "";
  filter: string = "";

  openedSidenav: boolean = true;

  displayedColumns: string[] = ['id', 'nombre'];
  dataSource: GruposDataSource;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(changeDetectorRef: ChangeDetectorRef, 
    private apiService: GruposService, 
    media: MediaMatcher, 
//    public appsDialog:MatDialog,
    public dialog: MatDialog) {
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }

  ngOnInit() {
    this.dataSource = new GruposDataSource(this.apiService);    
    this.dataSource.loadData('','asc','',0,5);    
  }

  ngAfterViewInit(){
    this.sort.sortChange.subscribe(() => { this.orderBy = this.sort.active; this.paginator.pageIndex = 0});
    merge(this.sort.sortChange,this.paginator.page)
      .pipe(
        tap(()=> this.loadData())
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  checkFilter(){
    this.inputSearchTxt = this.filter;
  }
  applyFilter(): void {
    this.filter = this.inputSearchTxt;
    this.paginator.pageIndex = 0;
    this.loadData();
  }

  loadData(){   
    this.dataSource.loadData(this.filter.trim().toLowerCase(),this.sort.direction,this.orderBy,this.paginator.pageIndex, this.paginator.pageSize);
  }

  openDialog(grupo: Grupo): void {
    var item: any = {
      edit: true, 
      grupo: grupo
    }
    const dialogRef = this.dialog.open(GrupoDialogComponent, { width:"380px",data:item});

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        if(result.last_action != "none"){
          this.loadData();
        }
      }     
    });
  }

  openDialogCreate(): void{

    var item: any = {
      edit: false, 
      grupo: null
    }
    const dialogRef = this.dialog.open(GrupoDialogComponent, { width: "380px",data:item});

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        if(result.last_action != "none"){
          this.loadData();
        }
      }
     
    });
  }

}
