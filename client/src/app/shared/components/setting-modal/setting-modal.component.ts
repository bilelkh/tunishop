import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef, ModalBackdropOptions } from "ngx-bootstrap/modal";
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from "../../../modules/authentification/services/authentification.service";

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {
  public isAuthenticated = false;
  public user: any;
  modalRef: BsModalRef;
  @Output() action = new EventEmitter();
  constructor(
    private authentificationService : AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.isAuthenticated = this.authentificationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authentificationService.decodeToken();
      console.log("===this.user===",this.user)
    }
  }


  decline(): void {
    this.modalRef.hide();
  }

  navigate(link) {
    this.action.emit(link);

  }

}
