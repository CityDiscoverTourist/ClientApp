import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { QuesttypeService } from "src/app/services/questtype.service";
import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import { Router } from "@angular/router";

@Component({
    selector: "app-account-setting",
    templateUrl: "./account-setting.component.html",
    styleUrls: ["./account-setting.component.scss"],
})
export class AccountSettingComponent implements OnInit {
    isActiveCss = "";
    public langfixed;
    faDoorOpen = faDoorOpen;
    faKey = faKey;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private translateService: TranslateService,
        private _location: Location,
        private router: Router

    ) {


    }

    ngOnInit(): void {
        // Get Nav
        this.isActiveCss = sessionStorage.getItem('sessionStorage') != null ? sessionStorage.getItem('sessionStorage') : "profile";
        console.log('this.isActiveCss',this.isActiveCss);

        this.langfixed = localStorage.getItem("fixedlang") || "vi-VN";
        if (this.langfixed != null) {
            this.translateService.use(this.langfixed);
        }
    }

    changeStatus(navName) {
        this.isActiveCss = navName;
        sessionStorage.setItem('manage-account-nav', this.isActiveCss)
        if(this.isActiveCss == 'exit') this.router.navigate(["home-two"]);
    }
}
