import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../shared/services/notification.service";
import { ShopperService } from "../services/shopper.service";
import { SharedService } from "../../../shared/services/shared.service";
import { SubCategoryService } from "../../../modules/settings/sub-category/services/sub-category.service";
import { Governorates } from "../../../enum/governorate";
@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
  private modalTitle: string = "AJOUTER UN NOUVEAU CATEGORIES";
  private btnName: string = "Ajouter";
  private loading: boolean = false;
  private submitted: boolean = false;
  private showModal: boolean = false;
  private adsList = [];
  private p: number = 1;
  private searchText: string = "";
  private pageSize: number = 5;
  private totalItems: number = 0;
  private categoryList: any = [];
  private subCategoryList: any = [];
  private categoryId: string;
  private subCategoryId: string;
  private showSubCategory: boolean = false;
  private governoratesList: any = [];
  private adsForm: FormGroup;
  private category:any ; 
  private subCategory:any ; 
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private shopperService: ShopperService,
    private subCategoryService: SubCategoryService
  ) {
    this.adsForm = this.formBuilder.group({
      _id: [""],
      title: ["", Validators.required],
      category: ["", Validators.required],
      subCategory: ["", Validators.required],
      description :["", Validators.required]
    });
  }

  ngOnInit() {
    this.governoratesList = Governorates;
    this.getAds(1);
    this.getCategory();
  }

 

  getAds(page) {
    this.p = page;
    this.spinner.show();
    this.shopperService.getAds(5, page).subscribe(
      (data: any) => {
        console.log("data",data)
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
    console.log(" this.categoryList", this.categoryList);
    this.categoryId = $event.target.value;
    this.category =  this.categoryList.filter(category=>category._id === this.categoryId )[0] ; 
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
    this.subCategoryId = $event.target.value;
    this.subCategory =  this.subCategoryList.filter(subCategory=>subCategory._id === this.subCategoryId )[0] ; 
  }
  submit() {
      this.submitted =true ;
      if(this.adsForm.valid) {
           let ads = {
                 title : this.adsForm.value.title , 
                 description : this.adsForm.value.description , 
                 category :  this.category ,
                 subCategory :  this.subCategory 
           }

           this.shopperService.addAds(ads).subscribe((data)=> {
             console.log("data",data)
             this.notificationService.showSuccess("",'annonce ajoutée avec succès')
            this.getAds(1);
           },error=>{
                console.log("error",error)
           })


      }

  }

  scrollDown() {
    let el = document.getElementsByTagName('table')[0];
    el.scrollIntoView() ;
  }
}
