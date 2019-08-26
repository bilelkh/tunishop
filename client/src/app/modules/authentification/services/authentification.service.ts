import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  public URL: string = environment.URL;
  public isLoggedIn :boolean =false ; 
  constructor(private router: Router, private http: HttpClient) {
  }

  signin(user) {
    return this.http.post(this.URL + "signin", user);
  }

  signup(user) {
    return this.http.post(this.URL + "signup", user);
  }

  sendEmailReset(email) {
    return this.http.post(this.URL + "forgot-password", email);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("signin");
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      this.isLoggedIn=true ; 
    }
    else {
      this.isLoggedIn=false ; 
    }

    return this.isLoggedIn
  }
}
