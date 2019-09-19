import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../shared/services/navbar.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
  }

}
