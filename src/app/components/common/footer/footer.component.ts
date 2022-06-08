import { Component, OnInit } from "@angular/core";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
    faFacebookF = faFacebookF;
    faTwitter = faTwitter;
    faLinkedinIn = faLinkedinIn;
    faInstagram = faInstagram;
    faChevronUp = faChevronUp;
    faCopyright = faCopyright;

    constructor() {}

    ngOnInit(): void {}
}
