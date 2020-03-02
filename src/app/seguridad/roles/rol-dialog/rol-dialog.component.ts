import { Component, OnInit, OnDestroy, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatSelectionList } from '@angular/material';
import { Rol } from '../data-source/rol';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { RolesService } from '../data-source/roles.service';
import { merge,interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { map, switchMap, filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrls: ['./rol-dialog.component.css'],
  providers: [
    RolesService
  ]
})
export class RolDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;
  grupos:any [] = [];
  loading: boolean;

  id:any;
  permisosError:boolean;
  objectSubscription: Subscription;
  refreshSelectionListSubscription : Subscription;

  object:any;

  @ViewChild('permisos',{static: false}) permisosSelectionList: MatSelectionList;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RolDialogComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: RolesService) { }

  ngOnInit (){
    
    
    this.form = this.fb.group(
      {
        nombre: ['']
      }
    );

    this.loading = true;
    this.permisosError = false; 
    
    
  }
  
  ngOnDestroy(){
    this.objectSubscription.unsubscribe();
    if(this.refreshSelectionListSubscription != null){
      this.refreshSelectionListSubscription.unsubscribe();
    }    
  }

  ngAfterViewInit(){


    if(this.data.rol != null){
      this.id = this.data.rol.id;  


     
      this.objectSubscription = merge(
        this.apiService.grupos().pipe(
          map(response => {
            this.grupos = response.data;
            
            return false;
          })
        ),
        this.apiService.ver(this.id).pipe(
          map( response => {
            this.form.get("nombre").setValue(response.nombre);  
            this.object = response;
            return true;
          })
        )
      ).subscribe(
        response => {
          if(response){
            this.loading = false;
          }          
        }
      )

      // Set selected objects
      this.refreshSelectionListSubscription = interval(0).pipe(
        first( val => typeof this.permisosSelectionList !== "undefined" && !this.loading  )
      ).subscribe(
        val => {
          //this.permisosSelectionList.options = this.object.permisos;
          this.permisosSelectionList.options.forEach(item => {
            console.log(item.value.id +  ": [");
            for(var x in this.object.permisos ){
              console.log(this.object.permisos[x].id );
              if(item.value.id == this.object.permisos[x].id ){
                console.log("true");
                item.selected = true;
              }
            }
            console.log("]");
            
          });
        }
      )


    } else {
      this.objectSubscription  = this.apiService.grupos().subscribe(
        response => {
          this.loading = false;
          this.grupos = response.data;
        }, error=> {
          this.loading = false;
        }      
      ); 
    }    

    
  }

  crear(){
    this.loading = true;
    this.apiService.crear(this.form.value).subscribe(
      response => {
        this.loading = false;
        this.id = response.id;
        this.data.rol = response;
        this.data.edit = true;

        this.snackBar.open("Los datos fueron creados exitosamente", "Cerrar", {
          duration: 4000,
        });

        this.dialogRef.close({ last_action: "crear", data: this.data.grupo});

      },
      errorResponse => {
        this.loading = false;
        if(errorResponse.status == 409){
          this.snackBar.open("Verifique la información del formulario", "Cerrar", {
            duration: 4000,
          });
          this.setErrors(errorResponse.error);
        } else {
          this.snackBar.open(errorResponse.error.message, "Cerrar", {
            duration: 4000,
          });
        }         
      }      
    );
  }

  editar(){
    this.loading = true;
    this.apiService.editar(this.id,this.form.value).subscribe(
      response => {
        this.id = response.id;
        this.data.rol = response;
        this.loading = false;
        this.snackBar.open("Los datos fueron guardados exitosamente", "Cerrar", {
          duration: 4000,
        });

        this.dialogRef.close({ last_action: "editar", data: this.data.rol});
      },
      errorResponse => {
        this.loading = false;
        if(errorResponse.status == 409){
          this.snackBar.open("Verifique la información del formulario", "Cerrar", {
            duration: 4000,
          });
          this.setErrors(errorResponse.error);
        } else {
          this.snackBar.open(errorResponse.error.message, "Cerrar", {
            duration: 4000,
          });
        }             
      }      
    );
  }

  cancelar(): void {
    this.dialogRef.close({ last_action: "none"});
  }
  borrar(): void {
    const dialogConfirmRef = this.dialog.open(ConfirmDialogComponent, { data:"¿Estás seguro de borrar este elemento?"});

    dialogConfirmRef.afterClosed()
    .pipe(
      filter((result) => result == true),
      switchMap(v => this.apiService.borrar(this.id))
    )
    .subscribe(result => {
      this.dialogRef.close({
        last_action: "delete"
      });
    }, errorResponse => {
      this.snackBar.open(errorResponse.error.message, "Cerrar", {
        duration: 4000,
      });
    });
  }
  guardar(): void {
    console.log(this.getPermisosSeleccionados());
    for (const key in this.form.controls) {
      this.form.get(key).clearValidators();
      this.form.get(key).updateValueAndValidity();
    }  

    this.permisosError = false;

    if(this.data.edit){
      this.editar();
    } else {      
      this.crear();
    }
  }

  getPermisosSeleccionados() {
    return this.permisosSelectionList.selectedOptions.selected.map(s => s.value);
  }
  serverValidator(error: {[key: string]: any}):ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      return error;
    }
  }

  setErrors(validationErrors:any[]){
    this.permisosError = false;
    Object.keys(validationErrors).forEach( prop => {
      const formControl = this.form.get(prop);
      if(formControl){

        formControl.markAsTouched();       

        var array = [];
        for(var x in validationErrors[prop]){
          array.push(this.serverValidator({[validationErrors[prop][x]]: true}));
        }
        formControl.setValidators(array);              
        formControl.updateValueAndValidity();
      } else {
        if(prop == "permisos"){
          this.permisosError = true;
        }
      }
    });
  }
}
