import { Component, OnInit, OnDestroy } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Page } from "tns-core-modules/ui/page/page";
import { UserModel } from "../model/user.model";
import { capitalizationType, inputType, prompt, PromptOptions, PromptResult } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";

import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { TranslateService } from "@ngx-translate/core";


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {

    isSubmitButtonClicked = false;

    loginForm: FormGroup;

    firstName: AbortController;
    lastName: AbortController;
    email: AbstractControl;
    password: AbstractControl;
    confirmPassword: AbstractControl;

    constructor(
        private _page: Page,
        private fb: FormBuilder,
        private router: Router,
        // private messageMaager: MessageManager
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.isSubmitButtonClicked = false;
        this._page.actionBarHidden = true;
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.fb.group({
            email: ["", Validators.required, Validators.email],
            password: ["", Validators.required],
        });
    }

    signIn() {

        const loginFormValue: UserModel = this.loginForm.getRawValue();

        if (loginFormValue.email === undefined || loginFormValue.email === null || loginFormValue.email === '') {
            alert(this.translate.instant("LOGIN.PLEASE.ENTER.EMAIL"));
        } else if (loginFormValue.email !== undefined && loginFormValue.email !== null && loginFormValue.email !== '' && !this.isValidEmail(loginFormValue.email)) {
            alert(this.translate.instant("LOGIN.PLEASE.ENTER.VALID.EMAIL"));
        }
        else if (loginFormValue.password === undefined || loginFormValue.password === null || loginFormValue.password === '') {
            alert(this.translate.instant("LOGIN.PLEASE.ENTER.PASSWORD"));
        } else {

            this.isSubmitButtonClicked = true;

            console.log('Form Status => ' + this.loginForm.valid);
            console.log("Login Data  => " + JSON.stringify(loginFormValue));

            // this.router.navigate(["/screens"]);
            setTimeout(() => {
                this.isSubmitButtonClicked = false;
                alert(this.translate.instant("LOGIN.USER.LOGIN.SUCCESS"));
                
            }, 2000);

        }
    }

    isValidEmail(email: String) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toString());
    }


    forgotPassword() {
        let options: PromptOptions = {
            title: this.translate.instant('LOGIN.FORGOT.PASSWORD.TITLE'),
            defaultText: "",
            message: this.translate.instant('LOGIN.FORGOT.PASSWORD.MESSAGE'),
            okButtonText: this.translate.instant('LOGIN.FORGOT.OK'),
            cancelButtonText: this.translate.instant('LOGIN.FORGOT.CANCEL'),
            cancelable: true,
            inputType: inputType.email,
            capitalizationType: capitalizationType.sentences
        };

        prompt(options).then((result: PromptResult) => {
            console.log(JSON.stringify(result));
            if (result.result === true) {
                if (result.text === undefined || result.text === null || result.text === '') {
                    this.forgotPassword();
                    alert(this.translate.instant("LOGIN.PLEASE.ENTER.EMAIL"));
                } else if (result.text !== undefined && result.text !== null && result.text !== '' && !this.isValidEmail(result.text)) {
                    this.forgotPassword();
                    alert(this.translate.instant("LOGIN.PLEASE.ENTER.VALID.EMAIL"));
                }
                else {
                    alert(this.translate.instant("LOGIN.FORGOT.PASSWORD.CHANGE.SUCCESS"));
                }
            }
        });
    }



    facebookAuthentication() {
        console.log("facebookAuthentication Method Called");
    }

    googleAuthentication() {
        console.log("googleAuthentication Method Called");
    }

    setLanguage(args){
        this.translate.use(args);
    }

    goToRegister() {
        this.router.navigate(["/register"]);
    }

    ngOnDestroy() {
        this.isSubmitButtonClicked = false;
    }
}
