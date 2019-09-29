import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { CategoryComponent } from "./components/category/category.component"
import { SubCategoryComponent } from "./components/sub-category/sub-category.component"
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ CategoryComponent,SubCategoryComponent],
  imports: [
    NgxSpinnerModule,NgxPaginationModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
