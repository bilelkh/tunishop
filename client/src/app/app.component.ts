import { Component } from '@angular/core';
import {NavbarService} from "./shared/services/navbar.service"
import {AuthentificationService} from "./modules/authentification/services/authentification.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn :boolean= false ; 
  public showNavbar : boolean = false ; 
  constructor( public navbarService : NavbarService ,public authentificationService : AuthentificationService) {
    this.isLoggedIn  =     this.authentificationService.isAuthenticated()
    if(this.isLoggedIn) {
      this.navbarService.showNavbar()
    }
    else {
      this.navbarService.hideNavbar()
    }
  }
}
