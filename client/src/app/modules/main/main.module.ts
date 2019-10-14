import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ProductComponent } from './components/product/product.component';
import { AdsComponent } from './components/ads/ads.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './components/profile/profile.component';
import { AdComponent } from './components/ad/ad.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { UserAdsComponent } from './components/user-ads/user-ads.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';
import { MainRoutingModule } from './main-routing.module';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MarkerManager } from '@agm/core';
 import {MapsAPILoader} from '@agm/core';
@NgModule({
  declarations: [CategoryComponent,
    SubCategoryComponent,
    ProductComponent,
    AdsComponent,
    ProfileComponent,
    AdComponent,
    HomeComponent,
    UserAdsComponent,
    AdDetailsComponent,],
  imports: [
    CommonModule,
    MainRoutingModule,
    ModalModule,
    NgbModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcbJ8p8bp7OOC_Rv_H_pSupQJCcapbDyY',
      libraries: ["places"]
    }),
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [SharedService, GoogleMapsAPIWrapper,MarkerManager]

})
export class MainModule { }
