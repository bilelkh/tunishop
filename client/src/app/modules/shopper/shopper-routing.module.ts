import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShopperComponent } from "./shopper.component";
import { CategoryComponent } from "./category/category.component";
import { SubCategoryComponent } from "./sub-category/sub-category.component";
import {AdsComponent} from "./ads/ads.component"
const routes: Routes = [
  {
    path: "",
    component: ShopperComponent,
    children: [
      { path: "", redirectTo: "category", pathMatch: "full" },
      { path: "category", component: CategoryComponent },
      { path: "category/:id", component: SubCategoryComponent },
      { path: "ads", component: AdsComponent }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopperRoutingModule {}
