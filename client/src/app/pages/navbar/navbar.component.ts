import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from "../../shared/services/shared.service";
import { AuthentificationService } from "../../modules/authentification/services/authentification.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public isAuthenticated = false;
  constructor(
    private authentificationService: AuthentificationService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
   this.isAuthenticated =  this.authentificationService.isAuthenticated() ;
   console.log('===this.isAuthenticated===',this.isAuthenticated );
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authentificationService.logout();
  }
}
