import { Component, OnInit } from "@angular/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
@Component({
    selector: "app-pricing",
    templateUrl: "./pricing.component.html",
    styleUrls: ["./pricing.component.scss"],
})
export class PricingComponent implements OnInit {
    faCheck = faCheck;
    constructor(private translateService: TranslateService) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }

    ngOnInit(): void {}
}
