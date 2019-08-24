import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthentificationRoutingModule } from "./authentification-routing.module";
import { AuthentificationComponent } from "./authentification.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LostPasswordComponent } from "./components/lost-password/lost-password.component";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination";
@NgModule({
  declarations: [
    AuthentificationComponent,
    SigninComponent,
    SignupComponent,
    LostPasswordComponent,
    ResetPasswordComponent,
    
  ],
  imports: [CommonModule,FormsModule,NgxSpinnerModule,NgxPaginationModule,HttpClientModule ,ReactiveFormsModule, AuthentificationRoutingModule]
})
export class AuthentificationModule {}
