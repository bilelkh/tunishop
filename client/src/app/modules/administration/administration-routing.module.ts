import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdministrationComponent } from "./administration.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "shopper" },
      { path: "shopper", loadChildren: '../shopper/shopper.module#ShopperModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
