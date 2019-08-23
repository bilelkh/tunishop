import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesComponent } from "./pages.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedService } from "../shared/services/shared.service";
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
  ],
  imports: [CommonModule,RouterModule],
  exports: [PagesComponent],
  providers: [SharedService]
})
export class PagesModule {}
