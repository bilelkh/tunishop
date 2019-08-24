import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  URL: string = environment.URL;
  constructor(private http: HttpClient) {}

  getCategory(pageSize,page) {
    return this.http.get(this.URL + "category?pageSize="+pageSize+"&page="+page);
  }
  add(category) {
    return this.http.post(this.URL + "category", category);
  }
  edit(category) {
    return this.http.put(this.URL + "category/" + category._id, category);
  }
  delete(id) {
    return this.http.delete(this.URL + "category/" + id);
  }
}
