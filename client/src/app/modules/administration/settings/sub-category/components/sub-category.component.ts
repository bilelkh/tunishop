import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from "../services/sub-category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../../../shared/services/notification.service";
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  private modalTitle: string = "AJOUTER UN NOUVEAU SOUS CATEGORIES";
  private btnName: string = "Ajouter";
  private subCategoryForm: FormGroup;
  private loading: boolean = false;
  private submitted: boolean = false;
  private showModal: boolean = false;
  private subCategoryList = [];
  private categoryList = [];
  private category : any ;
  private p: number = 1;
  private searchText :string = ""
  private pageSize : number = 5 ;  
  public totalItems : number = 0 ; 
  constructor(
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public subCategoryService: SubCategoryService,
    private spinner: NgxSpinnerService
  ) {
    this.subCategoryForm = this.formBuilder.group({
      _id: [""],
      title: ["", Validators.required] ,
      category: ['',Validators.required]
    });
  }

  ngOnInit() {
    this.getSubCategory(1);
    this.getAllCategory() ;
  }
 
  getAllCategory() {
    this.subCategoryService.getCategory().subscribe(
      (data: any) => {
        console.log("data",data)
        this.categoryList = data.categorys;
      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }


  getSubCategory(page) {
    this.p=page ; 
    this.spinner.show();
    this.subCategoryService.getSubCategory(this.pageSize , page).subscribe(
      (data: any) => {
        console.log("dat",data)
        this.subCategoryList = data.subCategorys;
        this.totalItems = data.totalItem ;
        this.spinner.hide();
      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }

  submit() {
    this.submitted = true;
        if (this.subCategoryForm.invalid) {
            return;
        }
        let subCategory = {
          _id :     this.subCategoryForm.value._id , 
          title :  this.subCategoryForm.value.title ,
          category : this.category 
        }
    if (this.subCategoryForm.value._id) {
      this.subCategoryService.edit(subCategory).subscribe(
        data => {
          console.log("data",data)
          this.notificationService.showSuccess("sous categorie modifieé avec succes","succes") ; 
          this.showModal = false ;
          document.getElementsByClassName("modal-backdrop")[0].remove() ;
          this.getSubCategory(1);
          this.subCategoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    } else {
      this.subCategoryService.add(subCategory).subscribe(
        data => {
          this.notificationService.showSuccess("sous categorie  ajoutée avec succes","succes") ; 
          this.showModal = false ;
          document.getElementsByClassName("modal-backdrop")[0].remove() ;
          this.getSubCategory(1);
          this.subCategoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    }
  this.submitted=false ;
    
  }

  edit(subCategory) {
    console.log("subCategory.category._id",subCategory.category)
    this.modalTitle = "modifier la sous CATEGORIES  " + subCategory.title;
    this.showModal = true;
    this.btnName = "modifier";
    this.subCategoryForm.setValue({ _id: subCategory._id, title: subCategory.title  ,category :subCategory.category._id});
  }

  delete(subCategory) {
    this.subCategoryService.delete(subCategory._id).subscribe(
      data => {
        this.notificationService.showSuccess("sous categorie supprimée avec succes","succes") ; 
        this.getSubCategory(1);

      },
      error => {
        console.log("Error", error);
      }
    );
  }

  add() {
    this.showModal = true;
    this.btnName = "ajouter";
    this.modalTitle = "AJOUTER UN NOUVEAU sous CATEGORIES";
    this.subCategoryForm.reset();

  }

  onchangePageSize($event){
      this.pageSize= parseInt($event.target.value) ; 
      this.getSubCategory(1) ;
  }

  search($event) {
    this.searchText= $event.target.value ;
  }


  changeCategory($event) {
    this.category = this.categoryList.filter(object =>object._id === $event.target.value)[0] ;
    console.log("$event",$event.target.value)
  }
}
