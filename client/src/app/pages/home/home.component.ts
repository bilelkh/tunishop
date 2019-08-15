import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared/services/shared.service"
import {Router} from "@angular/router"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    this.router.navigate(['category']);
  }

}
