import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef, ModalBackdropOptions } from "ngx-bootstrap/modal";
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {

  modalRef: BsModalRef;
  @Output() action = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }


  decline(): void {
    this.modalRef.hide();
  }

  navigate(link) {
    this.action.emit(link);

  }

}
