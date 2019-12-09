import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { CategoryComponent } from "./components/category/category.component"
import { SubCategoryComponent } from "./components/sub-category/sub-category.component"
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './components/users/users.component';
import { AdsComponent } from './components/ads/ads.component';
import { SharedModule } from './../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../shared/components/renderer-button/button-renderer.component';

@NgModule({
  declarations: [CategoryComponent,ButtonRendererComponent, SubCategoryComponent, UsersComponent, AdsComponent],
  imports: [
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    AdministrationRoutingModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ]
})
export class AdministrationModule { }
