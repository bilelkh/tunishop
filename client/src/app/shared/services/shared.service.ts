import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  URL: string = environment.URL;
  constructor(
    public jwtHelperService  : JwtHelperService,
    private http: HttpClient
  ) {}
  getCategory() {
    return this.http.get(this.URL + "category");
  }

  getUserData() {
    return this.jwtHelperService.decodeToken(this.getToken())
  }

  getToken() {
    return localStorage.getItem("token");
  }


  getSubCategory() {
    return this.http.get(this.URL + "subCategory");
  }




}
