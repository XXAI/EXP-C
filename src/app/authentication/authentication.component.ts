import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  credentials:any = {};
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private authenticationService:AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  onSubmit():void {
    this.authenticationService.auth(this.authForm.value.username, this.authForm.value.password).subscribe(response =>{
      console.log(response);
      this.router.navigate(['/pacientes']);
    }, error => {
      this.snackBar.open(error.error, "Cerrar", {
        duration: 4000,
      });
    });
  }
 

}
