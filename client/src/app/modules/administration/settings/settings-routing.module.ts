import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { CategoryComponent } from "./category/components/category.component";
import { SubCategoryComponent } from "./sub-category/components/sub-category.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "category" },
      { path: "category", component: CategoryComponent },
      { path: "sub-category", component: SubCategoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
