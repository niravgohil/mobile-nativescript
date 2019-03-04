import { Component, NgZone } from "@angular/core";
import { environment } from "../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import * as Platform from "tns-core-modules/platform";
import {
    ApplicationEventData, off as applicationOff, on as applicationOn, resumeEvent
} from "tns-core-modules/application";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(
        private translate: TranslateService,
        private ngZone: NgZone,
    ) {
        this.translate.setDefaultLang("en");
        this.setLocalFromDevice()
        this.registerLifeCycleEvent();
    }

    setLocalFromDevice(): any {
        let language;
        if (Platform.isAndroid) {
            language = java.util.Locale.getDefault().getLanguage();
        } else if (Platform.isIOS) {
            language = NSLocale.preferredLanguages.firstObject;
        }
        if (!language) {
            language = Platform.device.language;
        }

        const langArray = language.split("-");
        this.translate.use(langArray[0]);

    }

    resumeCallBack(args: ApplicationEventData) {
        this.ngZone.run(() => {
            this.setLocalFromDevice();
        });
    }

    registerLifeCycleEvent(): any {
        applicationOff(resumeEvent);
        applicationOn(resumeEvent, this.resumeCallBack, this);
    }
}
