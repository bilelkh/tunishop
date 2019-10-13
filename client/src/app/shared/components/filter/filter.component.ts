import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopperService } from "../../../modules/main/services/shopper.service"

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
  private filterForm: FormGroup;
  @Input() adsList: any;
  @Input() delegationsList: any;
  @Input() governoratesList: any;
  @Input() categoryList: any;
  @Input() subCategoryList: any;

  private categoryId: any
  private category: any
  private subCategoryId: any
  private subCategory: any
  private showSubCategory = false;
  private value: number = 100;
  private delegationsListSelected: any
  private  delegationSelected: any
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
 //   console.log("===adsList===", this.adsList);
 //   console.log("===delegationsList===", this.delegationsList);
 //   console.log("===governoratesList===", this.governoratesList);
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

  changeGovernorate($event) {
    let governorateKey = this.filterForm.value.governorate.key;
    this.delegationsListSelected = this.delegationsList.filter(
      x => x.governorateKey == governorateKey
    )[0].delegations;
    console.log("delegationsListSelected", this.delegationsListSelected);
  }
  changeDelegations($event) {
    this.delegationSelected  = this.filterForm.value.delegation ;
    console.log("===this.delegationSelected===",this.delegationSelected)
  }
}
