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
    this.userData = this.authentificationService.decodeToken();
    this.profileForm.patchValue({
      email: this.userData.email,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      phone: this.userData.phone,
      adresse: this.userData.adresse
    })
  }

  submit() {
    const user  = {
      email: this.profileForm.value.email,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      phone: this.profileForm.value.phone,
      adresse: this.profileForm.value.adresse
    }
    console.log("user",user)
    console.log("===this.profileForm==",this.profileForm.value)
  }

}
