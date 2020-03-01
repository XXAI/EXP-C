import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Rol } from '../data-source/rol';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { RolesService } from '../data-source/roles.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrls: ['./rol-dialog.component.css'],
  providers: [
    RolesService
  ]
})
export class RolDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  grupos:any [];
  loading: boolean;

  id:any;

  gruposSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RolDialogComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: RolesService) { }

  ngOnInit (){

    if(this.data.rol != null){
      this.id = this.data.rol.id;
      this.form = this.fb.group(
        {
          nombre: [this.data.rol.nombre]
        }
      );
    } else {
      this.form = this.fb.group(
        {
          nombre: ['']
        }
      );
    }


    this.gruposSubscription  = this.apiService.grupos().subscribe(
      response => {
        this.loading = false;
        this.grupos = response.data;
        //this.grupos.push({id:"jajajajaja", nombre: "Opción no válida"});
      }, error=> {
        this.loading = false;
      }      
    );  
    
      
  }
  ngOnDestroy(){
    // Debería desuscribirme a los eventos de la api
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

    for (const key in this.form.controls) {
      this.form.get(key).clearValidators();
      this.form.get(key).updateValueAndValidity();
    }  

    if(this.data.edit){
      this.editar();
    } else {      
      this.crear();
    }
  }

  serverValidator(error: {[key: string]: any}):ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      return error;
    }
  }

  setErrors(validationErrors:any[]){
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
      }
    });
  }
}
