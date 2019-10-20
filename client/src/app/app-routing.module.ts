import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { AuthGuard } from "./guards/auth-guard.service"
const routes: Routes = [
  { path: "", loadChildren: () => import(`./modules/main/main.module`).then(m => m.MainModule) },
  { path: 'administration', loadChildren: () => import(`./modules/administration/administration.module`).then(m => m.AdministrationModule) },
  { path: 'authentification', loadChildren: () => import(`./modules/authentification/authentification.module`).then(m => m.AuthentificationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
