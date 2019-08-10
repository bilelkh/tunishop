import { Component, OnInit ,ViewChild ,ElementRef} from "@angular/core";
import { CategoryService } from "../services/category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {Renderer2} from '@angular/core';
import { NotificationService } from "../../../../../shared/services/notification.service";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  private modalTitle: string = "AJOUTER UN NOUVEAU CATEGORIES";
  private btnName: string = "Ajouter";
  private categoryForm: FormGroup;
  private loading: boolean = false;
  private submitted: boolean = false;
  private showModal: boolean = false;
  private categoryList = [];
  private p: number = 1;
  private searchText :string = ""
  private pageSize : number = 5 ;  
  public totalItems : number = 0 ; 
  constructor(
    private renderer: Renderer2,
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public categoryService: CategoryService,
    private spinner: NgxSpinnerService
  ) {
    this.categoryForm = this.formBuilder.group({
      _id: [""],
      title: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getCategory(1);
  }
  search($event) {
    this.searchText= $event.target.value ;
  }
  getCategory(page) {
    this.p=page ; 
    this.spinner.show();
    this.categoryService.getCategory(this.pageSize , page).subscribe(
      (data: any) => {
        this.categoryList = data.categorys;
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
          console.log("this.categoryForm.invalid",this.categoryForm)
        // stop here if form is invalid
        if (this.categoryForm.invalid) {
            return;
        }
    if (this.categoryForm.value._id) {
      this.categoryService.edit(this.categoryForm.value).subscribe(
        data => {
          console.log("data",data)
          this.notificationService.showSuccess("categorie modifieé avec succes","succes") ; 
          this.showModal = false ;
          document.getElementsByClassName("modal-backdrop")[0].remove() ;
          this.getCategory(1);
          this.categoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    } else {
      this.categoryService.add(this.categoryForm.value).subscribe(
        data => {
          this.notificationService.showSuccess("categorie ajoutée avec succes","succes") ; 
          this.showModal = false ;
          document.getElementsByClassName("modal-backdrop")[0].remove() ;
          this.getCategory(1);
          this.categoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    }
  this.submitted=false ;
    
  }

  edit(category) {
    this.modalTitle = "modifier la CATEGORIES  " + category.title;
    this.showModal = true;
    this.btnName = "modifier";
    this.categoryForm.patchValue({ _id: category._id, title: category.title });
  }

  delete(category) {
    this.categoryService.delete(category._id).subscribe(
      data => {
        this.notificationService.showSuccess("categorie supprimée avec succes","succes") ; 
        this.getCategory(1);

      },
      error => {
        console.log("Error", error);
      }
    );
  }

  add() {
    this.showModal = true;
    this.btnName = "ajouter";
    this.modalTitle = "AJOUTER UN NOUVEAU CATEGORIES";
    this.categoryForm.reset();

  }

  onchangePageSize($event){
      this.pageSize= parseInt($event.target.value) ; 
      this.getCategory(1) ;
  }
}
