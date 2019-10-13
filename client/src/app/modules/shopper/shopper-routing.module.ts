import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component";
import { SubCategoryComponent } from "./components/sub-category/sub-category.component";
import { AdsComponent } from "./components/ads/ads.component";
import { AdComponent } from "./components/ad/ad.component";
import { HomeComponent } from "./components/home/home.component";
import { AdDetailsComponent } from "./components/ad-details/ad-details.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: '**', redirectTo: "" },
  { path: "category", component: CategoryComponent },
  { path: "category/:id", component: SubCategoryComponent },
  { path: "ads", component: AdsComponent },
  { path: "ad", component: AdComponent },
  { path: "ad/:id", component: AdDetailsComponent }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopperRoutingModule { }
