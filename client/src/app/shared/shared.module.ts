import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAdsComponent } from './components/list-ads/list-ads.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedAdDetailsComponent } from './components/shared-ad-details/shared-ad-details.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { SettingModalComponent } from './components/setting-modal/setting-modal.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { MenuComponent } from './components/menu/menu.component';
import { SubCategoryModalComponent } from './components/sub-category-modal/sub-category-modal.component';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
@NgModule({
  declarations: [FilterComponent, ListAdsComponent, SharedAdDetailsComponent, ConfirmModalComponent, TableListComponent, SettingModalComponent, AlertModalComponent, MenuComponent,SubCategoryModalComponent, CategoryModalComponent],
  imports: [CommonModule,RouterModule, NgbModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, NgxPaginationModule],
  entryComponents: [ConfirmModalComponent,SettingModalComponent,AlertModalComponent,SubCategoryModalComponent,CategoryModalComponent],
  exports: [FilterComponent,MenuComponent,SettingModalComponent, SharedAdDetailsComponent, ListAdsComponent, TableListComponent, ConfirmModalComponent,AlertModalComponent,SubCategoryModalComponent,CategoryModalComponent]
})
export class SharedModule { }
