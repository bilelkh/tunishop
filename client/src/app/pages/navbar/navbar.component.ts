import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from "../../shared/services/shared.service";
import { AuthentificationService } from "../../modules/authentification/services/authentification.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SettingModalComponent } from '../../shared/components/setting-modal/setting-modal.component'
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component'
import { AlertModalComponent } from "../../shared/components/alert-modal/alert-modal.component"
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  providers: [BsModalService, BsModalRef]
})
export class NavbarComponent implements OnInit {
  public isAuthenticated = false;
  public user: any;
  private modalRef: BsModalRef;

  constructor(
    private authentificationService: AuthentificationService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef
  ) { }
  private username: string;
  ngOnInit() {
    this.isAuthenticated = this.authentificationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authentificationService.decodeToken();
      this.username = this.user.lastName + ' ' + this.user.firstName;
    }
  }
  navigate(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authentificationService.logout();
  }

  openSettingModal(ad: unknown) {
    let bsModalRef = this.modalService.show(SettingModalComponent, { class: 'modal-sm' });
    bsModalRef.content.action.subscribe((action) => {
      switch (action) {
        case "logout": {
          this.logout();
          break;
        }
        case "profile": {
          this.router.navigateByUrl('profile')
          break;
        }
        case "change-password": {
          this.router.navigateByUrl('./change-password')
          break;
        }
      }
      bsModalRef.hide();
    })
  }

  goToCreateAd() {

    this.router.navigateByUrl('ad');

  }
}