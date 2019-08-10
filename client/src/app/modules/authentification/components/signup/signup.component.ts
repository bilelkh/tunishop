import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from "../../services/authentification.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentificationService: AuthentificationService) {
      this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],

  }); }

  ngOnInit() {
  }


  submit(){
        this.authentificationService.signup(this.signupForm.value).subscribe(data=>{
            console.log("data",data)
        },error=> {
            console.log("Error",error)
        })
  }

}
