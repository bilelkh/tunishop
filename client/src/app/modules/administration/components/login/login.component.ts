import { Component, OnInit } from "@angular/core";
import { AuthentificationService } from "../../../authentification/services/authentification.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../../shared/services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthentificationService]
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted = false;
  private errorMessage: unknown = "incorrect email ou mot de passe";
  private showErrorMessage: boolean = false;
  private loading: boolean = true;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authentificationService: AuthentificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  submit() {
    this.spinner.show();
    this.authentificationService.signin(this.loginForm.value).subscribe(
      (data: any) => {
        console.log("data", data);
        this.spinner.hide()
        if (data.success ) {
          if(data.user.authorization==="admin"){
          this.router.navigateByUrl('category')
          localStorage.setItem('token',data.token)
        }else {
              this.showErrorMessage = true;
              this.errorMessage =  "vous n'avez pas la permission"
        }
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
