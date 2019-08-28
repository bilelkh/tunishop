import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
{ path: '', redirectTo: '', pathMatch: 'full' },
{ path: '',   loadChildren:"./modules/authentification/authentification.module#AuthentificationModule"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
/*
  { path: "shopper", loadChildren: "./modules/shopper/shopper.module#ShopperModule" },
  { path: "administration", loadChildren: "./modules/administration/administration.module#AdministrationModule"  },
  { path: "settings", loadChildren: "./modules/settings/settings.module#SettingsModule" },
  */