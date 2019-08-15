import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from "./modules/shopper/category/category.component"
const routes: Routes = [
 //  {path: '', loadChildren: './modules/authentification/authentification.module#AuthentificationModule'},
   {path: 'administration', loadChildren: './modules/administration/administration.module#AdministrationModule'},
   {path: 'category', loadChildren: './modules/shopper/shopper.module#ShopperModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
