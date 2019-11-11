import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubCategoryService } from "../../../modules/administration/services/sub-category.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {Subject} from "rxjs"

@Component({
  selector: 'app-sub-category-modal',
  templateUrl: './sub-category-modal.component.html',
  styleUrls: ['./sub-category-modal.component.scss'],
  providers: [BsModalService, BsModalRef]

})
export class SubCategoryModalComponent implements OnInit {
  private modalTitle: string = "AJOUTER UN NOUVEAU SOUS CATEGORIES";
  private subCategoryForm: FormGroup;
  private btnName: string = "Ajouter";
  private categoryList: any;
  private category: any;
  private submitted: boolean = false;
  private subCategory: any;
  private modalRef: BsModalRef;
  private subject = new Subject<any>();
  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private notificationService: NotificationService,
    private subCategoryService: SubCategoryService,
    private formBuilder: FormBuilder) {
    this.subCategoryForm = this.formBuilder.group({
      _id: [""],
      title: ["", Validators.required],
      category: ["", Validators.required]
    });


  }


  ngOnInit() {
    console.log('===categoryList===', this.categoryList);
    console.log("===this.subCategory===", this.subCategory)
    if (this.subCategory) {
      this.btnName = 'modifier'
      this.subCategoryForm.patchValue({ _id: this.subCategory._id, title: this.subCategory.title, category: this.subCategory.category._id })
    }
    else {
      this.btnName = 'ajouter'

    }
  }
  submit() {
    this.submitted = true;
    if (this.subCategoryForm.invalid) {
      return false;
    }
    let subCategory = {
      _id: this.subCategoryForm.value._id,
      title: this.subCategoryForm.value.title,
      category: this.category
    };

    if (this.subCategoryForm.value._id || this.subCategoryForm.value._id !== '') {
      this.subCategoryService.edit(subCategory).subscribe(
        data => {
          console.log("===edit===",data)
          this.subject.next({action : 'edit'}) ;
          this.notificationService.showSuccess(
            "sous categorie modifieé avec succes",
            "succes"
          );
          this.subCategoryForm.reset();
        }, 
        error => {
          console.log("Error", error);
        }
      );
    } else {
      delete subCategory['_id'];
      this.subCategoryService.add(subCategory).subscribe(
        data => {
          this.subject.next({action : 'add'})
          this.notificationService.showSuccess(
            "sous categorie  ajoutée avec succes",
            "succes"
          );
          this.subCategoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    }
    this.submitted = false;
  }

  changeCategory($event) {
    this.category = this.categoryList.filter(
      object => object._id === $event.target.value
    )[0];
    console.log("$event", $event.target.value);
  }

  onHide() {
    this.bsModalRef.hide();
  }

}
