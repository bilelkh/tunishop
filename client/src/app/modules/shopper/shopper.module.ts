import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ShopperRoutingModule } from "./shopper-routing.module";
import { SharedService } from "../../shared/services/shared.service";
import { CategoryComponent } from "./components/category/category.component";
import { SubCategoryComponent } from "./components/sub-category/sub-category.component";
import { ProductComponent } from "./components/product/product.component";
import { AdsComponent } from "./ads/ads.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    ProductComponent,
    AdsComponent
  ],
  imports: [CommonModule,FormsModule,ReactiveFormsModule, ShopperRoutingModule, NgxPaginationModule, NgxSpinnerModule],
  providers: [SharedService]
})
export class ShopperModule {}
