import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";

@Component({
    selector: "app-account-setting",
    templateUrl: "./account-setting.component.html",
    styleUrls: ["./account-setting.component.scss"],
})
export class AccountSettingComponent implements OnInit {
    isActiveCss = 'profile';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {}

    changeStatus() {
        if(this.isActiveCss == 'profile') this.isActiveCss = 'history'
        else this.isActiveCss = 'profile'
    }
}
