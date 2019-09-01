import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmModalComponent } from "./Modals/confirm-modal/confirm-modal.component";

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule],
  entryComponents : [ConfirmModalComponent],
  exports: [ ConfirmModalComponent ]
})
export class SharedModule {}
