import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from "./shared/shared.module";
import { AuthenticationModule } from './authentication/authentication.module';

import { AuthenticationService } from './authentication/authentication.service';

import { AppsDialogComponent } from './shared/apps-dialog/apps-dialog.component';
import { AccountDialogComponent } from './shared/account-dialog/account-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptor, ErrorInterceptor } from './authentication/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthenticationModule,
    SharedModule
  ],
  entryComponents: [
    AppsDialogComponent, AccountDialogComponent
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
