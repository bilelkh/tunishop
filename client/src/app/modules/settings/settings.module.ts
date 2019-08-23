import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryService } from "./category/services/category.service";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { CategoryComponent } from "./category/components/category.component";
import { SubCategoryComponent } from "./sub-category/components/sub-category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
@NgModule({
  declarations: [SettingsComponent, CategoryComponent, SubCategoryComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [CategoryService]
})
export class SettingsModule {}
