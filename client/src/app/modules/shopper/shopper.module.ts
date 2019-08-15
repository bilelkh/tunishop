import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShopperRoutingModule } from "./shopper-routing.module";
import { ShopperComponent } from "./shopper.component";
import { SharedService } from "../../shared/services/shared.service";
import { CategoryComponent } from "./category/category.component";
@NgModule({
  declarations: [CategoryComponent,ShopperComponent],
  imports: [CommonModule, ShopperRoutingModule],
  providers: [SharedService]
})
export class ShopperModule {}
