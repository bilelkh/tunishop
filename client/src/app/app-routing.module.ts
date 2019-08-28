import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {} from "./modules/shopper/shopper.module"
const routes: Routes = [
  /*
{ path: '', redirectTo: '', pathMatch: 'full' },
{ path: '',   loadChildren:"../modules/authentification/authentification.module#AuthentificationModule"},
{ path: 'settings',   loadChildren:"./modules/authentification/settings.module#SettingsModule"},
{ path: 'shopper',   loadChildren:"./modules/authentification/shopper.module#ShopperModule"},
*/
{ path: '', redirectTo: '', pathMatch: 'full' },
{ path: '',   loadChildren:"./modules/authentification/authentification.module#AuthentificationModule"},
{ path: 'shopper',   loadChildren:"./modules/shopper/shopper.module#ShopperModule"},
{ path: 'settings',   loadChildren:"./modules/settings/settings.module#SettingsModule"},
{ path: 'administration',   loadChildren:"./modules/administration/administration.module#AdministrationModule"},

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