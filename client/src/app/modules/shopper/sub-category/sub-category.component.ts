import { Component, OnInit } from '@angular/core';
import {ShopperService} from "../services/shopper.service"
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  constructor(public shopperService : ShopperService) { }

  ngOnInit() {
  }

  getSubCategory() {
    
  }

}
