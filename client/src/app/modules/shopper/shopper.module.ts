import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopperRoutingModule } from './shopper-routing.module';
import { SharedService } from '../../shared/services/shared.service';
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

@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    ProductComponent,
    AdsComponent,
    ProfileComponent,
    AdComponent,
    HomeComponent,

  ],

  imports: [
    CommonModule,
    ModalModule,
    NgbModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcbJ8p8bp7OOC_Rv_H_pSupQJCcapbDyY'
    }),
    SharedModule,
    ReactiveFormsModule,
    ShopperRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule],
  providers: [SharedService]
})
export class ShopperModule { }
