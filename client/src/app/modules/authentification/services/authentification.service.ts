import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  URL: string = environment.URL;
  constructor(private http: HttpClient) {}

  signin(user) {
    return this.http.post(this.URL + "signin", user);
  }

  signup(user) {
    return this.http.post(this.URL + "signup", user);
  }

  sendEmailReset(email) {
    return this.http.post(this.URL + "forgot-password",  email );
  }



  logout() {
    localStorage.removeItem("currentUser");
  }
}
