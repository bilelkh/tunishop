import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopperService } from "../../../modules/shopper/services/shopper.service"

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
  private filterForm: FormGroup;
  @Input() adsList: any;
  @Input() delegationsList: string;
  @Input() governoratesList: string;
  @Input() categoryList: any;
  categoryId: any
  category: any
  subCategoryId: any
  subCategory: any
  subCategoryList: any = []
  showSubCategory = false;
  value: number = 100;


  constructor(private shopperService: ShopperService, private formBuilder: FormBuilder, ) {
    this.filterForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("===adsList===", this.adsList);
    console.log("===delegationsList===", this.delegationsList);
    console.log("===governoratesList===", this.governoratesList);
    console.log("===categoryList===", this.categoryList);

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

  changeCategory($event) {
    this.categoryId = $event.target.value;
    this.category = this.categoryList.filter(
      category => category._id === this.categoryId
    )[0];
    this.getSubCategory();
  }

  onChangeSubCategory($event) {
    this.subCategoryId = $event.target.value;
    this.subCategory = this.subCategoryList.filter(
      subCategory => subCategory._id === this.subCategoryId
    )[0];
    console.log('====subCategory====', this.subCategory);
  }
}
