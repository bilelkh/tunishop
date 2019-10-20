import {AuthentificationService} from "../modules/authentification/services/authentification.service"
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authentificationService: AuthentificationService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  console.log("===this.authentificationService.isAuthenticated()===",this.authentificationService.isAuthenticated())
    if (this.authentificationService.isAuthenticated()) {
        return true;
    }
    this.router.navigateByUrl('/authentification/signin');
    return false;
  }

}