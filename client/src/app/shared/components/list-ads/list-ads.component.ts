import { Component, OnInit , Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrls: ['./list-ads.component.scss']
})
export class ListAdsComponent implements OnInit {
  @Input() adsList: any;
  private displayType = 'card'
  private p = 1 ;
  private itemsPerPage = 4 ;
  constructor(private router: Router) { }

  ngOnInit() {
  }


  navigateToAd(id: string) {
    this.router.navigateByUrl(`ad/${id}`);
    }

    showList(displayType){
      this.displayType = displayType ; 
    }
}
