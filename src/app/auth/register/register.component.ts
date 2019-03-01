import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { UserModel } from "../model/user.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "ns-register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, OnDestroy {

    isSubmitButtonClicked = false;

    registerForm: FormGroup;

    firstName: AbortController;
    lastName: AbortController;
    email: AbstractControl;
    password: AbstractControl;
    confirmPassword: AbstractControl;

    constructor(
        private _page: Page,
        private fb: FormBuilder,
        private translate: TranslateService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.isSubmitButtonClicked = false;
        // this._page.actionBarHidden = true;
        this.buildForm();
    }

    buildForm() {
        this.registerForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.required, Validators.email],
            password: ["", Validators.required],
            confirmPassword: ["", Validators.required],
        });
    }

    goBack() {
        this.router.navigate(["/login"]);
    }

    signUp() {
        const loginFormValue: UserModel = this.registerForm.getRawValue();

        if (loginFormValue.firstName === undefined || loginFormValue.firstName === null || loginFormValue.firstName === '') {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.FIRST.NAME"));
        }
        else if (loginFormValue.lastName === undefined || loginFormValue.lastName === null || loginFormValue.lastName === '') {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.LAST.NAME"));
        }
        else if (loginFormValue.email === undefined || loginFormValue.email === null || loginFormValue.email === '') {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.EMAIL"));
        }
        else if (loginFormValue.email !== undefined && loginFormValue.email !== null && loginFormValue.email !== '' && !this.isValidEmail(loginFormValue.email)) {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.VALID.EMAIL"));
        }
        else if (loginFormValue.password === undefined || loginFormValue.password === null || loginFormValue.password === '') {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.PASSWORD"));
        }
        else if (loginFormValue.confirmPassword === undefined || loginFormValue.confirmPassword === null || loginFormValue.confirmPassword === '') {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.CONFIRM.PASSWORD"));
        }
        else if (loginFormValue.password !== loginFormValue.confirmPassword) {
            alert(this.translate.instant("REGISTER.PLEASE.ENTER.CONFIRM.PASSWORD.NOT.MATCH"));
        } else {
            console.log("Register Data => " + JSON.stringify(loginFormValue));
            this._page.actionBarHidden = true;
            this.isSubmitButtonClicked = true;

            setTimeout(() => {
                this.isSubmitButtonClicked = false;
                alert(this.translate.instant("REGISTER.USER.SIGN.UP.SUCCESS"));
                this._page.actionBarHidden = false;
            }, 2000);
        }
    }

    isValidEmail(email: String) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toString());
    }

    facebookAuthentication() {
        console.log("facebookAuthentication Method Called");
    }

    googleAuthentication() {
        console.log("googleAuthentication Method Called");
    }

    goToRegister() {
        this.router.navigate(["/login"]);
    }

    ngOnDestroy() {
        this._page.actionBarHidden = false;
        this.isSubmitButtonClicked = false;
    }

}
