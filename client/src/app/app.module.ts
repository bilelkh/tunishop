import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './shared/services/notification.service';
import { RouterModule } from '@angular/router';
import { MainModule } from './modules/main/main.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthentificationModule } from './modules/authentification/authentification.module';
import { AdministrationModule } from './modules/administration/administration.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { HttpConfigInterceptor } from "./interceptor/httpconfig.interceptor"
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from "./modules/material-module"
import 'hammerjs';

import { SidenavService } from "./shared/services/sidenav.service"

@NgModule({
  declarations: [AppComponent],
  imports: [
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    PagesModule,
    RouterModule,
    MainModule,
    AdministrationModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    AuthentificationModule,
    AvatarModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcbJ8p8bp7OOC_Rv_H_pSupQJCcapbDyY'
    }),
  ],
  providers: [
    SidenavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    NotificationService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
