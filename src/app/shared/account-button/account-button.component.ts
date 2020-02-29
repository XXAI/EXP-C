import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';

@Component({
  selector: 'shared-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.css']
})
export class AccountButtonComponent implements OnInit, OnDestroy {  
  public dialogRef:MatDialogRef<any>;

  constructor( public dialog:MatDialog) { }  

  ngOnInit() {  }

  ngOnDestroy(){    
    if(this.dialogRef != null ){
      this.dialogRef.close();   
    }
  }

  openDialog() {
    this.dialogRef= this.dialog.open(AccountDialogComponent,{ backdropClass:'backdrop-apps-dialog', minWidth:"320px", minHeight:"320px", position: {'top': '60px', 'right':'5px'}, closeOnNavigation: true});
  }

}
