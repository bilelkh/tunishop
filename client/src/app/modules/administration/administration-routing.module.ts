import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {CategoryComponent} from "./components/category/category.component"
import {SubCategoryComponent} from "./components/sub-category/sub-category.component"

const routes: Routes = [
  { path: "", redirectTo: 'category', pathMatch: 'full' },
  { path: "category", component: CategoryComponent },
  { path: "sub-category", component: SubCategoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
