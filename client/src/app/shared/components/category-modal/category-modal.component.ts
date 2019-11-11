import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../../modules/administration/services/category.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  providers: [BsModalService, BsModalRef]

})
export class CategoryModalComponent implements OnInit {
  private categoryForm: FormGroup;
  private submitted: boolean = false;
  private btnName: string = "Ajouter";
  private modalTitle: string = "AJOUTER UN NOUVEAU CATEGORIES";
  private modalRef: BsModalRef;

  constructor( 
    private bsModalRef: BsModalRef,
    private notificationService: NotificationService,
    private categoryService : CategoryService ,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
    this.categoryForm = this.formBuilder.group({
      _id: [""],
      title: ["", Validators.required],
    });
   }

  ngOnInit() {
  }

  submit() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    console.log('===this.categoryForm.value===',this.categoryForm.value)
   

    if (this.categoryForm.value._id  || this.categoryForm.value._id !== '') {
      this.categoryService.edit(this.categoryForm.value).subscribe(
        data => {
          this.notificationService.showSuccess("categorie modifieé avec succes", "succes");
          this.categoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    } else {
      delete this.categoryForm.value['_id'];
      this.categoryService.add(this.categoryForm.value).subscribe(
        data => {
          this.notificationService.showSuccess("categorie ajoutée avec succes", "succes");
          this.categoryForm.reset();
        },
        error => {
          console.log("Error", error);
        }
      );
    }
    this.submitted = false;

  }

  onHide() {
    this.bsModalRef.hide();
  }

}
