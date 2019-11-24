import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AdsService {
  URL: string = environment.URL;
  constructor(private http: HttpClient) {}
  getAds(pageSize, page) {
    return this.http.get(`${this.URL}ads?pageSize = ${pageSize}&page=${page}`
    );
  }
}
