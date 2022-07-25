import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { QuesttypeService } from "src/app/services/questtype.service";
import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';

@Component({
    selector: "app-account-setting",
    templateUrl: "./account-setting.component.html",
    styleUrls: ["./account-setting.component.scss"],
})
export class AccountSettingComponent implements OnInit {
    isActiveCss = "profile";
    public langfixed;
    faDoorOpen = faDoorOpen;
    faKey = faKey;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private translateService: TranslateService,
        private _location: Location
    ) {
        // Get Nav
        this.isActiveCss = sessionStorage.getItem('sessionStorage');
    }

    ngOnInit(): void {
        this.langfixed = localStorage.getItem("fixedlang") || "vi-VN";
        if (this.langfixed != null) {
            this.translateService.use(this.langfixed);
        }
    }

    changeStatus(navName) {
        this.isActiveCss = navName;
        sessionStorage.setItem('manage-account-nav', this.isActiveCss)
        if(this.isActiveCss == 'exit') this._location.back();
    }
}
