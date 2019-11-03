import { Component,ViewChild } from '@angular/core';
import {NavbarService} from "./shared/services/navbar.service"
import {AuthentificationService} from "./modules/authentification/services/authentification.service";
import { MatSidenav } from '@angular/material';
import {SidenavService} from "./shared/services/sidenav.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;

  public isLoggedIn :boolean= false ; 
  public showNavbar : boolean = false ; 
  constructor( public sidenavService : SidenavService ,public navbarService : NavbarService ,public authentificationService : AuthentificationService) {
  //  this.sidenavService.setSidenav(this.sidenav);
 
    this.isLoggedIn  =     this.authentificationService.isAuthenticated()
    if(this.isLoggedIn) {
      this.navbarService.showNavbar()
    }
    else {
      this.navbarService.hideNavbar()
    }
  }
  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  // ngAfterViewInit() {
  //   if(this.sidenav){
  //     console.log("===ngAfterViewInit===",this.sidenav.open())
  //   }
  // }
}
