import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthentificationService } from "../../services/authentification.service";

@Component({
  selector: "app-lost-password",
  templateUrl: "./lost-password.component.html",
  styleUrls: ["./lost-password.component.scss"]
})
export class LostPasswordComponent implements OnInit {
  forgotEmailForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentificationService: AuthentificationService
  ) {
    this.forgotEmailForm = this.formBuilder.group({
      email: ["",[ Validators.required]],
    });
  }

  ngOnInit() {}

  submit() {
      this.authentificationService.sendEmailReset(this.forgotEmailForm.value).subscribe((data:any)=>{
          console.log("data",data) ;
          if(data.success)  {
             this.router.navigateByUrl('signin') ;
          }
        
      },error=>{
          console.log("Error",error) ; 
          throw error ;
      })
      
  }
}
