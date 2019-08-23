import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShopperRoutingModule } from "./shopper-routing.module";
import { ShopperComponent } from "./shopper.component";
import { SharedService } from "../../shared/services/shared.service";
import { CategoryComponent } from "./category/category.component";
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NewAdsComponent } from './new-ads/new-ads.component';
@NgModule({
  declarations: [CategoryComponent,ShopperComponent, SubCategoryComponent, ProductComponent, AddProductComponent, NewAdsComponent],
  imports: [CommonModule, ShopperRoutingModule],
  providers: [SharedService]
})
export class ShopperModule {}
