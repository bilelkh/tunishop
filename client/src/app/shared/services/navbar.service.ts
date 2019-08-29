import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isOpen :boolean = false ;
  constructor() {


   } 
   
   showNavbar() {
     this.isOpen = true ; 
      return   this.isOpen ;
    }

    hideNavbar() {
      this.isOpen = false ; 
      return   this.isOpen ;
    }
}
