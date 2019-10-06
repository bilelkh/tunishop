import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "../../services/shared.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-ad-details',
  templateUrl: './shared-ad-details.component.html',
  styleUrls: ['./shared-ad-details.component.scss']
})
export class SharedAdDetailsComponent implements OnInit {
  @Input() adId: string;
  private ad : any ; 
  constructor(private location: Location,public sharedService: SharedService) { }

  ngOnInit() {
    this.getAdById()
  }

  getAdById() {
    this.sharedService.getAdById(this.adId).subscribe(data => {
      this.ad = data
    }, error => {
      console.log("error", error)
    })
  }

  goBack() {
    this.location.back();
  }

}
