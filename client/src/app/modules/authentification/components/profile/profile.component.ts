import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from "../../services/authentification.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userData: any;
  private profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authentificationService: AuthentificationService) {
    this.profileForm = this.formBuilder.group({
      email: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: ["", Validators.required],
      adresse: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {

    this.authentificationService.getProfile().subscribe((data: any) => {
      this.userData = data.user;
      this.profileForm.patchValue({
        email: this.userData.email,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        phone: this.userData.phone,
        adresse: this.userData.adresse
      })
    }, error => {
      console.log("error", error)
    })

  }

  submit() {
    const user: any = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      phone: this.profileForm.value.phone,
      adresse: this.profileForm.value.adresse,
      _id: this.userData._id
    }

    console.log("===user===", user)

    this.authentificationService.updateUserData(user).subscribe(data => {
      console.log("===data===", data)
    }, error => {
      console.log("==error==", error)
    })

  }

}
