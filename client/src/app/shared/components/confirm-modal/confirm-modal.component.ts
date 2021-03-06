import { Component, OnInit ,Output ,EventEmitter} from '@angular/core';
import { BsModalService, BsModalRef,ModalBackdropOptions } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  message: string;
  modalRef: BsModalRef;
  @Output() action = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
  confirm(): void {
    this.action.emit(true);
  }
 
  decline(): void {
    this.modalRef.hide();
  }
}
