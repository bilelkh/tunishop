import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ShopperService } from '../../../main/services/shopper.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { SubCategoryService } from '../../../administration/services/sub-category.service';
import { Governorates } from '../../../../enum/governorate';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Delegations } from '../../../../enum/delegations';
import { AuthentificationService } from "../../../authentification/services/authentification.service";
import { Location } from '@angular/common';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import { google } from '@google/maps';

declare var google: any;

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @ViewChild('labelImport', null)
  labelImport: ElementRef;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;



  @ViewChild("search",null)
  public searchElementRef: ElementRef;
  private fileToUpload: File = null;
  private modalTitle = 'AJOUTER UN NOUVEAU CATEGORIES';
  private btnName = 'Ajouter';
  private loading = false;
  private submitted = false;
  private showModal = false;
  private adsList = [];
  private searchText = '';
  private pageSize = 5;
  private totalItems = 0;
  private categoryList = [];
  private subCategoryList: any = [];
  private categoryId: string;
  private subCategoryId: string;
  private showSubCategory = false;
  private governoratesList: unknown = [];
  private delegationsList: any = [];
  private delegationsListSelected: any = [];
  private delegationSelected: unknown = [];
  private adForm: FormGroup;
  private category: any;
  private subCategory: unknown;
  private showConfirmModal = false;
  private ad: any;
  private showDetail = false;
  private files: any[] = [];
  private filesURL: any[] = [];
  private selectedGovernorate: any;;
  private selectedDelegation: any;;
  private user: any;
  private place: any;
  private p = 1;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private shopperService: ShopperService,
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService,
    private authentificationService: AuthentificationService,
    private location: Location,
  ) {

    this.adForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
    });
    this.searchControl = new FormControl();
    this.user = this.authentificationService.decodeToken();
  }



  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.place =place ;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.governoratesList = Governorates;
    this.delegationsList = Delegations;
    this.getAds(1);
    this.getCategory();
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
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
        console.log('error', error);
        throw error;
      }
    );
  }

  getCategory() {
    this.sharedService.getCategory().subscribe(
      (data: any) => {
        this.categoryList = data.categorys;
      },
      error => {
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
    console.log("==place==", this.place)

    if (this.adForm.valid) {
      const ad = {
        userId: this.user._id,
        title: this.adForm.value.title,
        description: this.adForm.value.description,
        governorate: this.adForm.value.governorate,
        delegation: this.adForm.value.delegation,
        category: this.category,
        price: this.adForm.value.price,
        subCategory: this.subCategory,
        filesURL: this.filesURL,
        adersse: this.place.formatted_address,
        latitude: this.latitude,
        longitude: this.longitude
      }

      this.shopperService.addAd(ad).subscribe(
        data => {
          this.notificationService.showSuccess('', 'annonce ajouté avec succès');
          this.location.back();
        },
        error => {
          console.log('error', error);
        }
      );
    }
  }



  confirmModal(ad: unknown) {
    this.showConfirmModal = true;
    this.ad = ad;
  }

  edit(ad) {
    this.adForm.setValue({
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
            'annonces a été supprimé avec succès',
            ''
          );
        },
        error => {
          throw error;
        }
      );
    }
  }


  changeGovernorate($event) {
    const governorateKey = parseInt(this.selectedGovernorate.key);
    this.delegationsListSelected = this.delegationsList.filter(
      x => x.governorateKey === governorateKey
    )[0].delegations;
    console.log("=== this.delegationsListSelected ===", this.delegationsListSelected )
    //console.log("selectedGovernorate",this.selectedGovernorate)
  }

  changeDelegations($event) {
    const delegationKey = parseInt(this.selectedDelegation.key);
    this.delegationSelected = this.delegationsListSelected.filter(
      x => x.key === delegationKey
    )[0];
  }

  onFileChange(files) {
    this.filesURL = [];
    // this.fileToUpload = files.item(0);
    for (var i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
    this.preview();
  }

  deleteFile(index) {
    this.filesURL.splice(index, 1)
  }
  preview() {
    // Show preview 
    // var mimeType = this.fileData.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[i]);
      reader.onload = (event) => {
        console.log(reader.result)
        this.filesURL.push(reader.result)
      }


    }



  }

  goBack() {
    this.router.navigateByUrl('')
  }
}
