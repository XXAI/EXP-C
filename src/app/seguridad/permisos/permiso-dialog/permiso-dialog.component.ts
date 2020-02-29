import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Permiso } from '../model/permiso';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { PermisosService } from '../data-source/permisos.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { map, switchMap, filter } from 'rxjs/operators';



@Component({
  selector: 'app-permiso-dialog',
  templateUrl: './permiso-dialog.component.html',
  styleUrls: ['./permiso-dialog.component.css'],
  providers: [
    PermisosService
  ]
})
export class PermisoDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  grupos:any [];
  loading: boolean;

  id:any;
  //validationErrors: {string: any} [] =[];

  gruposSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PermisoDialogComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: PermisosService) { }

  ngOnInit (){

    if(this.data.permiso != null){
      this.id = this.data.permiso.id;
      this.form = this.fb.group(
        {
          id: [this.data.permiso.id],
          descripcion: [this.data.permiso.descripcion],
          grupo_id: [this.data.permiso.grupo_id],
          su: [this.data.permiso.su]
        }
      );
    } else {
      this.form = this.fb.group(
        {
          id: ['', Validators.required],
          descripcion: [''],
          grupo_id: [''],
          su: [false,'']
        }
      );
      this.form.controls['id'].disable();
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
    this.gruposSubscription.unsubscribe();
  }
  crear(){
    this.loading = true;
    this.apiService.crear(this.form.value).subscribe(
      response => {
        this.loading = false;
        this.id = response.id;
        this.data.permiso = response;
        this.form.get('id').setValue(response.id);
        this.data.edit = true;
        this.form.controls['id'].enable();

        this.snackBar.open("Los datos fueron creados exitosamente", "Cerrar", {
          duration: 4000,
        });

        this.dialogRef.close({ last_action: "crear", data: this.data.permiso});

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
        this.data.permiso = response;
        this.loading = false;
        this.snackBar.open("Los datos fueron guardados exitosamente", "Cerrar", {
          duration: 4000,
        });

        this.dialogRef.close({ last_action: "editar", data: this.data.permiso});
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
