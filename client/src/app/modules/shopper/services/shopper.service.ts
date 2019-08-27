import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ShopperService {

  URL: string = environment.URL;
  constructor(private http: HttpClient) {
    
  }
  getSubCategoryByIdCategory(id) {
    return this.http.get(this.URL + "subCategoryByIdCategory/"+id);
  }

  getAds(pageSize,page) {
    return this.http.get(this.URL + "ads?pageSize="+pageSize+"&page="+page);
  }

  addAds(ads) {
    return this.http.post(this.URL + "ads",ads);
  }

}
