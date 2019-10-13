import { Component, OnInit } from "@angular/core";
import { ShopperService } from "../../../main/services/shopper.service";
import { SharedService } from "../../../../shared/services/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-sub-category",
  templateUrl: "./sub-category.component.html",
  styleUrls: ["./sub-category.component.scss"]
})
export class SubCategoryComponent implements OnInit {
  private idCategory: number;
  private subCategoryList: unknown[];
  constructor(
    private  shopperService : ShopperService ,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    public router: Router
  ) {  this.route.params.subscribe(params => {
      this.idCategory = params["id"];
    });}

  ngOnInit() {
    this.getSubCategory() ;
  }

   getSubCategory() {
    this.shopperService.getSubCategoryByIdCategory(this.idCategory).subscribe(
      (data: any) => {
        console.log("data",data)
        this.subCategoryList = data;
      },
      error => {
        throw error;
      }
    );
   }

   goToProduct(subCategory) {

   }
}
