import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from "../../../authentification/services/authentification.service"
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authentificationService : AuthentificationService) { }

  ngOnInit() {
  }


  // updateProfile(user) {
  //       this.authentificationService.updateProfile(user).subscribe(data=>{
  //           console.log("===data===",data)
  //       },error=>{
  //           console.log("===error===",error) ; 
  //           throw error ; 
  //       })
  // }

}
