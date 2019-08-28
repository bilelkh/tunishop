import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryService } from "./services/category.service";
import { SettingsRoutingModule } from "./settings-routing.module";
import { CategoryComponent } from "./components/category/category.component";
import { SubCategoryComponent } from "./components/sub-category/sub-category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
@NgModule({
  declarations: [CategoryComponent, SubCategoryComponent],
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
