import { Component, OnInit } from "@angular/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-pricing",
    templateUrl: "./pricing.component.html",
    styleUrls: ["./pricing.component.scss"],
})
export class PricingComponent implements OnInit {
    faCheck = faCheck;
    constructor() {}


    ngOnInit(): void {}
}
