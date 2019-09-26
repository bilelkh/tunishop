import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LostPasswordComponent } from "./components/lost-password/lost-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ProfileComponent } from "./components/profile/profile.component"

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'signin' },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "lost-password", component: LostPasswordComponent },
  { path: "reset-password/:token", component: ResetPasswordComponent },
  { path: "profile", component: ProfileComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
