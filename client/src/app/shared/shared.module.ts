import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from './filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  entryComponents : [],
  exports: [FilterComponent]
})
export class SharedModule {}
