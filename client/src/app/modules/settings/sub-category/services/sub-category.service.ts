import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  URL: string = environment.URL;
  constructor(private http: HttpClient) {}

  getSubCategory(pageSize,page) {
    return this.http.get(this.URL + "subCategory?pageSize="+pageSize+"&page="+page);
  }

  getCategory() {
    return this.http.get(this.URL + "category");
  }
  add(subCategory) {
    return this.http.post(this.URL + "subCategory", subCategory);
  }
  edit(subCategory) {
    return this.http.put(this.URL + "subCategory/" + subCategory._id, subCategory);
  }
  delete(id) {
    return this.http.delete(this.URL + "subCategory/" + id);
  }
}
