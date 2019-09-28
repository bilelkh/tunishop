import { Component, OnInit } from '@angular/core';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  private adsList = [];
  private p = 1;
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private shopperService: ShopperService,
              private subCategoryService: SubCategoryService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.governoratesList = Governorates;
    this.delegationsList = Delegations;
    console.log('this.delegationsList', this.delegationsList);
    this.getAds(1);
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

  

}
