import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [PagesComponent, NavbarComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports : [PagesComponent]
})
export class PagesModule { }
