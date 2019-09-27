import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
  providers : [BsModalService, BsModalRef]
})
export class ConfirmModalComponent implements OnInit {
  ngOnInit() {}
  modalRef: BsModalRef;
  message: string;
  constructor(private modalService: BsModalService) {
    console.log("-------->")
  }

  

  confirm(): void {
    this.message = "Confirmed!";
    this.modalRef.hide();
  }

  decline(): void {
    this.message = "Declined!";
    this.modalRef.hide();
  }
}