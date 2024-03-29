import { Component, OnInit } from "@angular/core";

//custome Icons:
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-features",
    templateUrl: "./features.component.html",
    styleUrls: ["./features.component.scss"],
})
export class FeaturesComponent implements OnInit {
    // custome
    faShieldVirus = faShieldVirus;
    faCoffee = faCoffee;
    faLightbulb = faLightbulb;
    faBolt = faBolt;
    faClockRotateLeft = faClockRotateLeft;

    constructor() {}

    ngOnInit(): void {}
}
