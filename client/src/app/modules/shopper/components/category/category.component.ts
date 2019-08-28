import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../../../shared/services/shared.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  private categoryList: any[];
  private user: unknown;
  constructor(private sharedService: SharedService, public router: Router) {}

  ngOnInit() {
    console.log(1)
    this.getUserData();
    this.getCategory();
  }

  getUserData() {
    this.user = this.sharedService.getUserData();
    console.log('this.user',this.user)
  }
  getCategory() {
    this.sharedService.getCategory().subscribe(
      (data: any) => {
        console.log("data",data)
        this.categoryList = data.categorys;
      },
      error => {
        throw error;
      }
    );
  }

  goToSubCategory(category) {
    this.router.navigate(["./category", category._id]);
  }
}
