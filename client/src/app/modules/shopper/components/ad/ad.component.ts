import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ShopperService } from "../../services/shopper.service";
import { SharedService } from "../../../../shared/services/shared.service";
import { SubCategoryService } from "../../../settings/services/sub-category.service";
import { Governorates } from "../../../../enum/governorate";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "../../../../shared/modals/confirm-modal/confirm-modal.component";
import { Delegations } from "../../../../enum/delegations";
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

    
  @ViewChild('labelImport',null)
  labelImport: ElementRef;

  private fileToUpload: File = null;
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
  private delegationsList: any = [];
  private delegationsListSelected: any = [];
  private delegationSelected: any = [];

  private adsForm: FormGroup;
  private category: any;
  private subCategory: any;
  private showConfirmModal: boolean = false;
  private ad: any;
  private showDetail: boolean = false;
  private images: string[] = [];
  private stepper: Stepper;

 
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private shopperService: ShopperService,
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService
  ) {
    this.adsForm = this.formBuilder.group({
      _id: [""],
      files: ["", Validators.required],
      title: ["", Validators.required],
      category: ["", Validators.required],
      subCategory: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      governorate: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.governoratesList = Governorates;
    this.delegationsList = Delegations;
    console.log("this.delegationsList", this.delegationsList);
    this.getAds(1);
    this.getCategory();
  }
  next() {
    this.stepper.next();
  }
  getAds(page) {
    this.p = page;
    this.spinner.show();
    this.shopperService.getAds(5, page).subscribe(
      (data: any) => {
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
    this.categoryId = $event.target.value;
    this.category = this.categoryList.filter(
      category => category._id === this.categoryId
    )[0];
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
    this.subCategory = this.subCategoryList.filter(
      subCategory => subCategory._id === this.subCategoryId
    )[0];
  }
  submit() {
    this.submitted = true;
    if (this.adsForm.valid) {
      let ads = {
        title: this.adsForm.value.title,
        description: this.adsForm.value.description,
        category: this.category,
        price: this.adsForm.value.price,
        subCategory: this.subCategory
      };

      this.shopperService.addAds(ads).subscribe(
        data => {
          console.log("data", data);
          this.notificationService.showSuccess(
            "",
            "annonce ajoutée avec succès"
          );
          this.getAds(1);
        },
        error => {
          console.log("error", error);
        }
      );
    }
  }

  scrollDown() {
    let el = document.getElementsByTagName("table")[0];
    el.scrollIntoView();
  }

  confirmModal(ad: unknown) {
    this.showConfirmModal = true;
    this.ad = ad;
  }

  edit(ad) {
    this.adsForm.setValue({
      _id: ad._id,
      title: ad.title,
      price: ad.price,
      category: ad.category._id,
      description: ad.description,
      subCategory: ad.subCategory._id
    });
  }

  detail(ad) {
    this.ad = ad;
    this.showDetail = true;
  }

  confirmDelete(response) {
    if (response) {
      this.shopperService.deleteAds(this.ad._id).subscribe(
        data => {
          this.getAds(1);
          this.notificationService.showSuccess(
            "annonces a été supprimé avec succès",
            ""
          );
        },
        error => {
          throw error;
        }
      );
    }
  }

  getFileDetails($event) {
    for (var i = 0; i < $event.target.files.length; i++) {
      this.images.push($event.target.files[i]);
    }

    console.log("this.images", this.images);
  }

  changeGovernorate($event) {
    console.log("$event", $event.target.value);
    let governorateKey = $event.target.value;
    this.delegationsListSelected = this.delegationsList.filter(
      x => x.governorateKey == governorateKey
    )[0].delegations;
    console.log("delegationsListSelected", this.delegationsListSelected);
  }

  changeDelegations($event) {
    let delegationKey = $event.target.value;
    console.log("delegationKey", delegationKey);
    console.log("delegationsListSelected", this.delegationsListSelected);

    this.delegationSelected = this.delegationsListSelected.filter(
      x => x.key == delegationKey
    )[0];
    console.log(" this.delegationSelected", this.delegationSelected);
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }
}
