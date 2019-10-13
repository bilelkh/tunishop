import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router" ; 
@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss']
})
export class AdDetailsComponent implements OnInit {
  public adId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.adId =params['id']
    });
  }



}
