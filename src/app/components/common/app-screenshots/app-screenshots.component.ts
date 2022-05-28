import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-app-screenshots",
    templateUrl: "./app-screenshots.component.html",
    styleUrls: ["./app-screenshots.component.scss"],
})
export class AppScreenshotsComponent implements OnInit {
    constructor(private translateService: TranslateService) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }

    ngOnInit(): void {}
}
