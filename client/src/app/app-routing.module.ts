import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
const routes: Routes = [
  {
    path: "",
    loadChildren:
      "./modules/authentification/authentification.module#AuthentificationModule"
  },
  {
    path: "administration",
    loadChildren:
      "./modules/administration/administration.module#AdministrationModule"
  },
  { path: "shopper", loadChildren: "./modules/shopper/shopper.module#ShopperModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
