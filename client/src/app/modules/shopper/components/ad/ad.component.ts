import {  Component, ElementRef,  OnInit,

 

  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ShopperService } from '../../services/shopper.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { SubCategoryService } from '../../../settings/services/sub-category.service';
import { Governorates } from '../../../../enum/governorate';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Delegations } from '../../../../enum/delegations';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @ViewChild('labelImport', null)
  labelImport: ElementRef;

  private fileToUpload: File = null;
  private modalTitle = 'AJOUTER UN NOUVEAU CATEGORIES';
  private btnName = 'Ajouter';
  private loading = false;
  private submitted = false;
  private showModal = false;
  private adsList = [];
  private p = 1;
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
  private selectedGovernorate: any; ;
  private selectedDelegation: any; ;

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
    this.adForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required]
    });
  }



  ngOnInit() {
    this.governoratesList = Governorates;
    this.delegationsList = Delegations;
    console.log('this.delegationsList', this.delegationsList);
    this.getAds(1);
    this.getCategory();
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
        console.log('error', error);
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
        console.log('error', error);
        throw error;
      }
    );
  }

  onChangeSubCategory($event) {
    this.subCategoryId = $event.target.value;
    this.subCategory = this.subCategoryList.filter(
      subCategory => subCategory._id === this.subCategoryId
    )[0];
    console.log('====subCategory====', this.subCategory);
  }
  submit() {
    console.log('====submit====', this.adForm.valid);
    console.log("this.delegationsList",this.delegationsList);
    console.log("this.governoratesList",this.governoratesList)

    this.submitted = true;
    if (this.adForm.valid) {
      const ad = {
        title: this.adForm.value.title,
        description: this.adForm.value.description,
        governorate: this.adForm.value.governorate,
        delegation: this.adForm.value.delegation,
        category: this.category,
        price: this.adForm.value.price,
        subCategory: this.subCategory ,
        filesURL : this.filesURL
      };
      console.log('===ad===',ad)
      // this.shopperService.addAd(ad).subscribe(
      //   data => {
      //     console.log('data', data);
      //     this.notificationService.showSuccess('', 'annonce ajouté avec succès');
      //     this.router.navigateByUrl('ads');
      //   },
      //   error => {
      //     console.log('error', error);
      //   }
      // );
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
     const governorateKey =parseInt(this.selectedGovernorate.key);
    this.delegationsListSelected = this.delegationsList.filter(
      x => x.governorateKey ===  governorateKey
    )[0].delegations;
    // console.log("=== this.delegationsListSelected===", this.delegationsListSelected)
    //console.log("this.delegationsListSelected",this.delegationsListSelected)
    //console.log("selectedGovernorate",this.selectedGovernorate)
  }

  changeDelegations($event) {
    console.log("===selectedDelegation===",this.selectedDelegation)
     const delegationKey = parseInt(this.selectedDelegation.key);
     console.log("delegationKey",delegationKey)
    this.delegationSelected = this.delegationsListSelected.filter(
      x => x.key === delegationKey
    )[0];
    console.log("this.delegationSelected",this.delegationSelected)
  }

  onFileChange(files) {
    console.log('===files===', files);
    this.filesURL = [] ;
    // this.fileToUpload = files.item(0);
    for (var i = 0; i < files.length; i++) {
      console.log("files", files[i])
      this.files.push(files[i]);
    }
    this.preview() ;
  }

  deleteFile(index) {
    console.log("===index===",index)
    this.filesURL.splice(index,1)
  }
  preview() {
    // Show preview 
    // var mimeType = this.fileData.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    console.log('this.files.length',this.files.length)
    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[i]);
      reader.onload = (event) => {
        console.log(reader.result)
        this.filesURL.push(reader.result)
        console.log("this.filesURL",this.filesURL)
      }


    }

    console.log("this.filesURL", this.filesURL)



  }
}
