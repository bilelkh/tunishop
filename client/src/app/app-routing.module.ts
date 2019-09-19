import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from './pages/not-found/not-found.component'

const routes: Routes = [
{ path: '', loadChildren: () => import(`./modules/authentification/authentification.module`).then(m => m.AuthentificationModule) },
{ path: 'shopper', loadChildren: () => import(`./modules/shopper/shopper.module`).then(m => m.ShopperModule) },
{ path: 'settings', loadChildren: () => import(`./modules/settings/settings.module`).then(m => m.SettingsModule) },
{ path: 'administration', loadChildren: () => import(`./modules/administration/administration.module`).then(m => m.AdministrationModule) },
{
  path: '**',
  component: NotFoundComponent
}
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