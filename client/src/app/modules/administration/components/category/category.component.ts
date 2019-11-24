import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ConfirmModalComponent } from "../../../../shared/components/confirm-modal/confirm-modal.component";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CategoryModalComponent } from "../../../../shared/components/category-modal/category-modal.component";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  providers: [BsModalService, BsModalRef]
})
export class CategoryComponent implements OnInit {
  private categoryForm: FormGroup;
  private loading: boolean = false;
  private categoryList = [];
  private p: number = 1;
  private searchText: string = "";
  private pageSize: number = 5;
  public totalItems: number = 0;
  constructor(
    private modalService: BsModalService,
    private notificationService: NotificationService,
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
    this.searchText = $event.target.value;
  }
  getCategory(page) {
    this.p = page;
    this.spinner.show();
    this.categoryService.getCategory(this.pageSize, page).subscribe(
      (data: any) => {
        this.categoryList = data.categorys;
        this.totalItems = data.totalItem;
        this.spinner.hide();
      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }

  edit(category) {
    // this.modalTitle = "modifier la CATEGORIES  " + category.title;
    // this.showModal = true;
    // this.btnName = "modifier";
    // this.categoryForm.patchValue({ _id: category._id, title: category.title });
  }

  confirmModal(category: any) {
    let bsModalRef = this.modalService.show(ConfirmModalComponent, {
      class: "modal-sm"
    });
    bsModalRef.content.action.subscribe(action => {
      if (action) {
        bsModalRef.hide();
        this.onDelete(category._id);
      }
    });
  }

  onDelete(id) {
    this.categoryService.delete(id).subscribe(
      data => {
        this.notificationService.showSuccess(
          "categorie supprimée avec succes",
          "succes"
        );
        this.getCategory(1);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  add() {
    // this.showModal = true;
    // this.btnName = "ajouter";
    // this.modalTitle = "AJOUTER UN NOUVEAU CATEGORIES";
    // this.categoryForm.reset();
    const initialState = {
      categoryList: this.categoryList
    };

    let bsModalRef = this.modalService.show(CategoryModalComponent, {
      initialState,
      class: "modal-dialog"
    });
    console.log("===subject===", bsModalRef.content.subject);
    // bsModalRef.content.subject.subscribe((action) => {
    //   if (action) {
    //     bsModalRef.hide()
    //   }
    // });
  }

  onchangePageSize($event) {
    this.pageSize = parseInt($event.target.value);
    this.getCategory(1);
  }
}
