import { Component } from "@angular/core";
import { environment } from "../environments/environment";

// import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { TranslateService } from "@ngx-translate/core";
@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(
        private translate: TranslateService
    ) {
        this.translate.setDefaultLang("en");
        // this.translate.use(device.language.split("-")[0]);
        this.translate.use("en");

        console.log(this.translate.getDefaultLang());

        console.log(this.translate.instant('HOME.TITLE'));
        console.log(environment.apiUrl);
        // console.log(JSON.stringify(device));
        // console.log("Language => " + device.language);

        // console.log("Language Name => " + device.language.split("-")[0]);

        // console.log("isAndroid => " + isAndroid);
        // console.log("isIOS => " + isIOS);

    }

}
