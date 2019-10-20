import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from "../../../authentification/services/authentification.service"
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private changePasswordForm: FormGroup;
  private user: any;
  private newUserCredential: any;
  private submitted: boolean = false;
  constructor(public authentificationService: AuthentificationService, private formBuilder: FormBuilder) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.user = this.authentificationService.decodeToken();
  }




  submit() {
    this.submitted = true;
    console.log("=== this.submitted ===", this.changePasswordForm.controls )
    this.newUserCredential = this.changePasswordForm.value;
    this.newUserCredential.email = this.user.email;
    // this.authentificationService.channgeUserPassword(this.newUserCredential).subscribe(data => {
    //   console.log('==data==', data)
    // }, error => {
    //   console.log(error);
    //   throw error;
    // })
    console.log("=== this.newUserCredential===", this.newUserCredential)
  }


  resetForm() {
    this.changePasswordForm.reset()
  }




}
