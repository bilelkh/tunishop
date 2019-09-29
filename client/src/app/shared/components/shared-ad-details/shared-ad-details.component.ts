import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from "../../services/shared.service"
@Component({
  selector: 'app-shared-ad-details',
  templateUrl: './shared-ad-details.component.html',
  styleUrls: ['./shared-ad-details.component.scss']
})
export class SharedAdDetailsComponent implements OnInit {
  @Input() adId :string ;
  constructor(public sharedService : SharedService) { }

  ngOnInit() {
    console.log("id",this.adId)
    this.getAdById()
  }

  getAdById() {
    this.sharedService.getAdById(this.adId).subscribe(data=>{
        console.log("data",data)
    },error=>{
        console.log("error",error)
    })
  }

}
