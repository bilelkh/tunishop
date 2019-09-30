import { Component, OnInit ,ViewChild} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ShopperService } from "../../services/shopper.service";
import { SharedService } from "../../../../shared/services/shared.service";
import { SubCategoryService } from "../../../administration/services/sub-category.service";
import { Governorates } from "../../../../enum/governorate";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Delegations } from "../../../../enum/delegations";
import { ConfirmModalComponent } from "../../../../shared/components/confirm-modal/confirm-modal.component"

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"],
  providers: [BsModalService, BsModalRef]
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

  public url: any;
  private modalRef: BsModalRef;
  private message: string;

  // @ViewChild(ConfirmModalComponent,null)  ConfirmModalComponent : ConfirmModalComponent; ////// missing declaration

  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private shopperService: ShopperService,
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef
  ) {
    this.adsForm = this.formBuilder.group({
      _id: [""],
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
  getAds(page) {
    this.p = page;
    this.spinner.show();
    this.shopperService.getAds(5, page).subscribe(
      (data: any) => {
        this.adsList = data.ads;
        console.log("===this.adsList===", this.adsList);
        // console.log("ad.filesURL[0]",this.adsList[1].filesURL[0]);
        //esthis.url = this.adsList[1].filesURL[0] ; 
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



  confirmModal(ad: unknown) {
    console.log("===ConfirmModalComponent===",ConfirmModalComponent)
    this.modalRef = this.modalService.show(ConfirmModalComponent , { class: 'modal-sm' }).content;
    console.log("===this.bsModalRef.content===",this.bsModalRef.content)
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
}
