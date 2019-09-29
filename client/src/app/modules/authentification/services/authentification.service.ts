import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';


@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  public URL: string = environment.URL;
  public isLoggedIn = false;
  public visible: boolean = true;

  constructor(public jwtHelper: JwtHelperService, private router: Router, private http: HttpClient) {
  }

  signin(user) {
    return this.http.post(this.URL + 'signin', user);
  }

  signup(user) {
    return this.http.post(this.URL + 'signup', user);
  }

  sendEmailReset(email) {
    return this.http.post(this.URL + 'forgot-password', email);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('signin');
    this.hide();
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  decodeToken() {
    return localStorage.getItem('token') ? this.jwtHelper.decodeToken(localStorage.getItem('token').split(' ')[1]).data : null;
  }

  editProfile(user) {
    return this.http.post(this.URL + 'signin', user);
  }
}
