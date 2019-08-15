import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShopperComponent } from "./shopper.component";
import { CategoryComponent } from "./category/category.component";
const routes: Routes = [
      { path: "category", component: CategoryComponent },
      { path: "category/:id", component: CategoryComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopperRoutingModule {}
