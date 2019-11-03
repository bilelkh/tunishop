import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav',null) sidenav: MatSidenav;

  reason = '';
  opened = false;

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


  
  constructor() {
   }

  ngOnInit() {    console.log("===sidenav===",this.sidenav)

  }




}
