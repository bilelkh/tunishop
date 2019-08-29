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
  public isAuthenticated: boolean = false;
  constructor(
    private authentificationService: AuthentificationService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("  this.authentificationService.isAuthenticated()",  this.authentificationService.isAuthenticated())
   this.isAuthenticated =  this.authentificationService.isAuthenticated()
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authentificationService.logout();
  }
}
