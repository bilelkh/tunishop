import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component"
import { SubCategoryComponent } from "./components/sub-category/sub-category.component"
import { UsersComponent } from "./components/users/users.component"
import { AdsComponent } from "./components/ads/ads.component"

const routes: Routes = [
  { path: "", redirectTo: 'category', pathMatch: 'full' },
  { path: "category", component: CategoryComponent },
  { path: "sub-category", component: SubCategoryComponent },
  { path: "users", component: UsersComponent },
  { path: "ads", component: AdsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
