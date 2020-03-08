import { Component, OnInit, OnDestroy, Inject, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatSelectionList } from '@angular/material';
import { Rol } from '../data-source/rol';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, NgModel } from '@angular/forms';
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
  //refreshSelectionListSubscription : Subscription;


  object:any;

  @ViewChildren('permisos') permisosSelectionList: QueryList<any>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RolDialogComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: RolesService) { }

  ngOnInit (){
    
    this.object = {
      permisos:[]
    }
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
    /*
    if(this.refreshSelectionListSubscription != null){
      this.refreshSelectionListSubscription.unsubscribe();
    }    */
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
        last => {
          if(last){
            this.loading = false;
            this.refreshPermisosSelectionList(this.object.permisos.map( v => v.id));
          }          
        }
      )
      /*     

      // Set selected objects
      this.refreshSelectionListSubscription = interval(0).pipe(
        first( val => typeof this.permisosSelectionList !== "undefined" && !this.loading  )
      ).subscribe(
        val => {
         
          //this.permisosSelectionList.options = this.object.permisos;
          this.permisosSelectionList.toArray().forEach(
            (list) => {
              (list as MatSelectionList).options.forEach(item => {
                for(var x in this.object.permisos ){
                  if(item.value.id == this.object.permisos[x].id ){
                    item.selected = true;
                  }
                }                
              });
            }
          );
        }
      )*/


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

    var payload = this.form.value;
    payload.permisos = this.getPermisosSeleccionados();

    this.apiService.crear(payload).subscribe(
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
        this.refreshPermisosSelectionList(payload.permisos);
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

    var payload = this.form.value;
    payload.permisos = this.getPermisosSeleccionados();

    this.apiService.editar(this.id,payload).subscribe(
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
        this.refreshPermisosSelectionList(payload.permisos);
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

    this.permisosError = false;

    if(this.data.edit){
      this.editar();
    } else {      
      this.crear();
    }
  }

  refreshPermisosSelectionList(array: any[]){
    setTimeout(()=> {      
      this.permisosSelectionList.toArray().forEach(
        (list) => {
          (list as MatSelectionList).options.forEach(item => {
            for(var x in array ){
              if(item.value.id == array[x]){
                item.selected = true;
              }
            }                
          });
        }
      );
    })
   
  }

  getPermisosSeleccionados() {
    var permisos:any[] = [];
  
    this.object.permisos = [];
    this.permisosSelectionList.toArray().forEach(
      (list) => {
        (list as MatSelectionList).selectedOptions.selected.forEach(item =>{
          permisos.push(item.value.id);
          this.object.permisos.push(item.value);
        });       
      }
    );
    
    return permisos;
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
