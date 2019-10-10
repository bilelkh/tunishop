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
  public user: any;
  constructor(
    private authentificationService: AuthentificationService,
    private sharedService: SharedService,
    private router: Router
  ) { }
  private username: string;
  ngOnInit() {
    this.isAuthenticated = this.authentificationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authentificationService.decodeToken();
      this.username = this.user.lastName + ' ' + this.user.firstName;
      console.log("user", this.user)
    }
  }
  navigate(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authentificationService.logout();
  }
}
