import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../shared/services/shared.service"
import {Router} from "@angular/router"
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private categoryList : any [] ;
  constructor(private sharedService : SharedService , public router : Router) { }

  ngOnInit() {
    this.getCategory() ;
  }
  getCategory() {
      this.sharedService.getCategory().subscribe((data:any)=>{
          this.categoryList =data.categorys ;
      },error=>{
         throw error ;
      })
  }

  goToCategory(category) {
    console.log("category",category)
    this.router.navigate(['./category',category._id]);
  }

  
  

}
