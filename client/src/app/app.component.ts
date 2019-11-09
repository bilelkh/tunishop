import { Component, ViewChild } from '@angular/core';
import { NavbarService } from "./shared/services/navbar.service"
import { AuthentificationService } from "./modules/authentification/services/authentification.service";
import { MatSidenav } from '@angular/material';
import { SidenavService } from "./shared/services/sidenav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  public isAuthenticated:boolean = false;
  public isLoggedIn: boolean = false;
  public showNavbar: boolean = false;
   public user :any ;
  constructor(
    private authentificationService: AuthentificationService,
    public sidenavService: SidenavService, 
    public navbarService: NavbarService) {

    this.isLoggedIn = this.authentificationService.isAuthenticated()
    if (this.isLoggedIn) {
      this.navbarService.showNavbar()
    }
    else {
      this.navbarService.hideNavbar()
    }
  }
  ngOnInit(): void {
    this.isAuthenticated = this.authentificationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authentificationService.decodeToken();
      console.log("===this.user===", this.user)
    }

    this.sidenavService.setSidenav(this.sidenav);
  }
  // ngAfterViewInit() {
  //   if(this.sidenav){
  //     console.log("===ngAfterViewInit===",this.sidenav.open())
  //   }
  // }
}
