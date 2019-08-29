import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from "../../modules/authentification/services/authentification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from "../../shared/services/shared.service";
@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.scss']
})
export class PageTopComponent implements OnInit {

  constructor(
    private authentificationService: AuthentificationService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  logout() {
    this.authentificationService.logout();
  }

}
