import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'salud-exp';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      "custom_schedule",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/calendar-blue.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "custom_patient",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/patient.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "custom_settings",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/settings.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "custom_users",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/users.svg")
    );
  }
}
