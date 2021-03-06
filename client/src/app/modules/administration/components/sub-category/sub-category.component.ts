import { Component, OnInit } from "@angular/core";
import { SubCategoryService } from "../../services/sub-category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "../../../../shared/services/notification.service";
import { SubCategoryModalComponent } from "../../../../shared/components/sub-category-modal/sub-category-modal.component"
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "../../../../shared/components/confirm-modal/confirm-modal.component"

@Component({
  selector: "app-sub-category",
  templateUrl: "./sub-category.component.html",
  styleUrls: ["./sub-category.component.scss"],
  providers: [BsModalService, BsModalRef]

})
export class SubCategoryComponent implements OnInit {
  private loading: boolean = false;
  private subCategoryList = [];
  private categoryList = [];
  private category: any;
  private p: number = 1;
  private searchText: string = "";
  private pageSize: number = 5;
  public totalItems: number = 0;
  private modalRef: BsModalRef;
  private action: string = '';
  constructor(
    public bsModalRef: BsModalRef,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public subCategoryService: SubCategoryService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
  ) {

  }

  ngOnInit() {
    this.getSubCategory(1);
    this.getAllCategory();
  }

  getAllCategory() {
    console.log('===getAllCategory===')
    this.subCategoryService.getCategory().subscribe(
      (data: any) => {
        this.categoryList = data.categorys;
        console.log("===this.categoryList===", this.categoryList);

      },
      error => {
        console.log("error", error);
        throw error;
      }
    );
  }

  getSubCategory(page) {
    this.p = page;
    this.spinner.show();
    this.subCategoryService.getSubCategory(this.pageSize, page).subscribe(
      (data: any) => {
        this.subCategoryList = data.subCategorys;
        this.totalItems = data.totalItem;
        this.spinner.hide();
      },
      error => {
        throw error;
      }
    );
  }



  edit(subCategory) {
    const initialState = {
      categoryList: this.categoryList,
      subCategory: subCategory
    };


    console.log("==initialState===", initialState)
    let bsModalRef = this.modalService.show(SubCategoryModalComponent, { initialState, class: 'modal-dialog' });
    bsModalRef.content.subject.subscribe((action) => {
      if (action) {
        this.getSubCategory(1);
        bsModalRef.hide()
      }
    })
  }

  onDelete(id) {
    console.log("===id===", id)
    this.subCategoryService.delete(id).subscribe(
      data => {
        this.notificationService.showSuccess(
          "sous categorie supprimée avec succes",
          "succes"
        );
        this.getSubCategory(1);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  add() {
    const initialState = {
      categoryList: this.categoryList,
    };


    let bsModalRef = this.modalService.show(SubCategoryModalComponent, { initialState, class: 'modal-dialog' });
    console.log('===subject===', bsModalRef.content.subject)
    bsModalRef.content.subject.subscribe((action) => {
      if (action) {
        this.getSubCategory(1);
        bsModalRef.hide()
      }

    });
    // this.btnName = "ajouter";
    // this.modalTitle = "AJOUTER UN NOUVEAU sous CATEGORIES";
    // this.subCategoryForm.reset();
  }

  onchangePageSize($event) {
    this.pageSize = parseInt($event.target.value);
    this.getSubCategory(1);
  }

  search($event) {
    this.searchText = $event.target.value;
  }

  confirmModal(subCategory: any) {
    let bsModalRef = this.modalService.show(ConfirmModalComponent, { class: 'modal-sm' });
    bsModalRef.content.action.subscribe((action) => {
      if (action) { bsModalRef.hide(); this.onDelete(subCategory._id); }

    });
  }


}
