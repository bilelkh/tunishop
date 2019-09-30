import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAdsComponent } from './components/list-ads/list-ads.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedAdDetailsComponent } from './components/shared-ad-details/shared-ad-details.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
@NgModule({
  declarations: [FilterComponent, ListAdsComponent, SharedAdDetailsComponent, ConfirmModalComponent],
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NgxSpinnerModule, NgxPaginationModule],
  entryComponents: [ConfirmModalComponent],
  exports: [FilterComponent,SharedAdDetailsComponent, ListAdsComponent,ConfirmModalComponent]
})
export class SharedModule { }
