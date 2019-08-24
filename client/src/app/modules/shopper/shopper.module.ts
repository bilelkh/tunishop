import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShopperRoutingModule } from "./shopper-routing.module";
import { ShopperComponent } from "./shopper.component";
import { SharedService } from "../../shared/services/shared.service";
import { CategoryComponent } from "./category/category.component";
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import { AdsComponent } from './ads/ads.component';
@NgModule({
  declarations: [CategoryComponent,ShopperComponent, SubCategoryComponent, ProductComponent, AdsComponent],
  imports: [CommonModule, ShopperRoutingModule],
  providers: [SharedService]
})
export class ShopperModule {}
