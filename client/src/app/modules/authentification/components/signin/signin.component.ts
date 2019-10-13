import { Component, OnInit } from "@angular/core";
import { AuthentificationService } from "../../services/authentification.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../../shared/services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted = false;
  private errorMessage: unknown = "incorrect email ou mot de passe";
  private showErrorMessage: boolean = false;
  private loading: boolean = true;
  private isAuthenticated: boolean = true;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authentificationService: AuthentificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authentificationService.hide() ;
  }

  submit() {
    this.spinner.show()
    this.authentificationService.signin(this.loginForm.value).subscribe(
      (data: any) => {
        this.spinner.hide()
        if (data.success) {
          localStorage.setItem('token', data.token) ;
          this.authentificationService.show()
          data.user.authorization==='admin' ?  this.router.navigateByUrl('administration') : this.router.navigateByUrl('') ;

        } else {
          if (data.msg === "WRONG EMAIL" || data.msg === "WRONG PASSWORD") {
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
