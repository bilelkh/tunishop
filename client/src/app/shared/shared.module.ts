import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAdsComponent } from './components/list-ads/list-ads.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedAdDetailsComponent } from './components/shared-ad-details/shared-ad-details.component';
@NgModule({
  declarations: [FilterComponent, ListAdsComponent, SharedAdDetailsComponent],
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NgxSpinnerModule, NgxPaginationModule],
  entryComponents: [],
  exports: [FilterComponent,SharedAdDetailsComponent, ListAdsComponent]
})
export class SharedModule { }
