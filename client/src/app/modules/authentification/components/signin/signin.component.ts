import { Component, OnInit } from "@angular/core";
import { AuthentificationService } from "../../services/authentification.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../../shared/services/notification.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: unknown ="incorrect email ou mot de passe";
  showErrorMessage: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentificationService: AuthentificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  submit() {
    this.authentificationService.signin(this.loginForm.value).subscribe(
      (data: any) => {
        console.log("data", data);
        if (data.succes) {
        } else {
          if (data.msg === "WRONG EMAIL" || data.msg === "WRONG PASSWORD" ) {
            this.showErrorMessage = true;
          }
        }
      },
      error => {
        console.log(error);
        throw error;
      }
    );
  }
}
