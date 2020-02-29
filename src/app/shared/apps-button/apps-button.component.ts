import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppsDialogComponent } from 'src/app/shared/apps-dialog/apps-dialog.component';

@Component({
  selector: 'shared-apps-button',
  templateUrl: './apps-button.component.html',
  styleUrls: ['./apps-button.component.css']
})
export class AppsButtonComponent implements OnInit, OnDestroy {
  public dialogRef:MatDialogRef<any>;

  constructor( public appsDialog:MatDialog) {
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    if(this.dialogRef != null ){
      this.dialogRef.close();   
    }
    
  }

  openDialog() {
    console.log("no deberia ejecutarme?");
    this.dialogRef = this.appsDialog.open(AppsDialogComponent,{ backdropClass:'backdrop-apps-dialog', minWidth:"320px", minHeight:"320px", maxHeight:"400px", position: {'top': '60px', 'right':'5px'},closeOnNavigation: true});
  }
}
