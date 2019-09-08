import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

const HttpOptions = {
  headers: new HttpHeaders({'Content-Type':"application/x-www-form-urlencoded"})
}

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

  addAds(ad:FormData) {
    return this.http.post(this.URL + "ads",ad,HttpOptions);
  }

  deleteAds(adId) {
    return this.http.delete(this.URL + "ad/"+adId);
  }

}
