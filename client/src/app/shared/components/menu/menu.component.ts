import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;

  constructor() {
    //  this.sidenav.close();
  }

  

  ngOnInit() {
    console.log("===sidenav===", this.sidenav)
  }

  ngAfterViewInit() {
    if(this.sidenav){
      console.log("===ngAfterViewInit===",this.sidenav)
    }
  }
}
