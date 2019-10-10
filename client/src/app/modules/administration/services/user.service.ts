import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = environment.URL;
  constructor(private http: HttpClient) {}

  getUsers(pageSize,page) {
    return this.http.get(this.URL + "users?pageSize="+pageSize+"&page="+page);
  }
}
