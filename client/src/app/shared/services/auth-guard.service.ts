import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthentificationService } from '../../../app/modules/authentification/services/authentification.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public authentification: AuthentificationService, public router: Router) {}
  canActivate(): boolean {
    if (!this.authentification.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
