import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomMatPaginatorIntl } from 'src/app/material/custom-mat-paginator-intl';

import {MatDialog} from '@angular/material/dialog';

export interface Paciente {
  expediente: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre: string;
  sexo: string;
  edad: string;
  curp: string;
}
const ELEMENT_DATA: Paciente[] = [
  {expediente:'0123456789', apellido_paterno: "Inés", apellido_materno:"De la Cruz", nombre: "Sor Juana", sexo: "F", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "López", apellido_materno:"de Santa Anna", nombre: "Antonio", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"},
  {expediente:'0123456789', apellido_paterno: "Gómez", apellido_materno:"Pérez", nombre: "Johan", sexo: "M", edad: "35 años", curp: "GOPJ810101XXX"}
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomMatPaginatorIntl() }
  ]
})
export class IndexComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  inputSearchTxt:string = "";
  modulePath:string = "/pacientes";

  openedSidenav: boolean = true;

  private _mobileQueryListener: () => void;


  displayedColumns: string[] = ['expediente', 'apellido_paterno', 'apellido_materno', 'nombre', 'sexo','edad', 'curp'];
  dataSource = new MatTableDataSource<Paciente>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    console.log("error antes");
    this.mobileQuery.removeListener(this._mobileQueryListener);
    console.log("error despues");
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = this.inputSearchTxt.trim().toLowerCase();
  }


}
