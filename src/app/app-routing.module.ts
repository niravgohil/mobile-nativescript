import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadChildren: "~/app/auth/auth.module#AuthModule"
    },
    // {
    //     path: "screens",
    //     loadChildren: "~/app/screens/screens.module#ScreensModule"
    // },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
