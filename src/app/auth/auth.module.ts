import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        TranslateModule
        ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { }