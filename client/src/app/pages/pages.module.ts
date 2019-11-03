import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedService } from '../shared/services/shared.service';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageTopComponent } from './page-top/page-top.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { AvatarModule } from 'ngx-avatar';
import {MaterialModule} from "../modules/material-module"

@NgModule({
  declarations: [
 
    PagesComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    PageTopComponent,
    NotFoundComponent,

  ],
  imports: [CommonModule,   MaterialModule, RouterModule],
  exports: [NavbarComponent, PageTopComponent, FooterComponent, SidebarComponent],
  providers: [SharedService]
})
export class PagesModule { }
