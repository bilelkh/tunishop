import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  URL: string = environment.URL;
  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get(this.URL + "category");
  }

}
