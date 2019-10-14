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
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
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
  // @ViewChild('search')
  public searchElementRef: ElementRef;
  private currentLatitude ; 
  private currentLongitude ; 

  constructor(private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private shopperService: ShopperService,
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService) {
    this.currentPostion()
  }
  lng = 10.2;
  lat = 36.8;
  selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 36.834688, lng: 10.111341, alpha: 1 },
    { lat: 35.856064, lng: 9.195557, alpha: 1 },
    { lat: 35.854854, lng: 9.568598, alpha: 1 },
  ];

  currentPostion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLatitude = position.coords.latitude ;
        this.currentLongitude = position.coords.longitude ;

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }
  ngOnInit() {
    this.governoratesList = Governorates;
    this.delegationsList = Delegations;
    console.log('this.delegationsList', this.delegationsList);

    this.getAds(1);
    this.getCategory()
  }
  getAds(page) {
    this.p = page;
    this.spinner.show();
    this.shopperService.getAds(10, page).subscribe(
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
        console.log('===data===', data);

        this.categoryList = data.categorys;
        console.log('===this.categoryList===', this.categoryList);

      },
      error => {
        console.log('error', error);
        throw error;
      }
    );
  }


}
