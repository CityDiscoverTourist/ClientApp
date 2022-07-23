import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { QuesttypeService } from "src/app/services/questtype.service";

@Component({
    selector: "app-account-setting",
    templateUrl: "./account-setting.component.html",
    styleUrls: ["./account-setting.component.scss"],
})
export class AccountSettingComponent implements OnInit {
    isActiveCss = "profile";
    public langfixed;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private translateService: TranslateService
    ) {}

    ngOnInit(): void {
        this.langfixed = localStorage.getItem("fixedlang") || "vi-VN";
        if (this.langfixed != null) {
            this.translateService.use(this.langfixed);
        }
    }

    changeStatus() {
        if (this.isActiveCss == "profile") this.isActiveCss = "history";
        else this.isActiveCss = "profile";
    }
}
