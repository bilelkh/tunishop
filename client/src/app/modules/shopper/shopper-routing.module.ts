import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component";
import { SubCategoryComponent } from "./components/sub-category/sub-category.component";
import { AdsComponent } from "./components/ads/ads.component";
import { AdComponent } from "./components/ad/ad.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/:id", component: SubCategoryComponent },
  { path: "ads", component: AdsComponent },
  { path: "ad", component: AdComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopperRoutingModule { }
