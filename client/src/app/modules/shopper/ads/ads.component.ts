import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../shared/services/notification.service";
import { ShopperService } from "../services/shopper.service";
import { SharedService } from "../../../shared/services/shared.service";
import { SubCategoryService } from "../../../modules/settings/sub-category/services/sub-category.service";
@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
  private modalTitle: string = "AJOUTER UN NOUVEAU CATEGORIES";
  private btnName: string = "Ajouter";
  private categoryForm: FormGroup;
  private loading: boolean = false;
  private submitted: boolean = false;
  private showModal: boolean = false;
  private adsList = [];
  private p: number = 1;
  private searchText: string = "";
  private pageSize: number = 5;
  public totalItems: number = 0;
  private categoryList: any = [];
  private subCategoryList: any = [];
  private categoryId: string;
  private showSubCategory: boolean = false;
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private shopperService: ShopperService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit() {
    this.getAds(1);
    this.getCategory();
  }

  getAds(page) {
    this.p = page;
    this.spinner.show();
    this.shopperService.getAds(5, page).subscribe(
      (data: any) => {
        console.log("data", data);
        this.adsList = data.ads;
        this.totalItems = data.totalItem;
        this.spinner.hide();
      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }

  getCategory() {
    this.sharedService.getCategory().subscribe(
      (data: any) => {
        console.log("data", data);
        this.categoryList = data.categorys;
        console.log(" this.categoryList", this.categoryList);
      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }

  changeCategory($event) {
    this.categoryId = $event.target.value;
    this.getSubCategory();
  }

  getSubCategory() {
    this.shopperService.getSubCategoryByIdCategory(this.categoryId).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.subCategoryList = data;
          this.showSubCategory = true;
        } else {
          this.showSubCategory = false;
        }
      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }

  onChangeSubCategory($event) {
    console.log("$event", $event);
  }
}
