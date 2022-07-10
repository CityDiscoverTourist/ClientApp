import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    faVenus = faVenus;
    faMars = faMars;
    sessionLogin = null;
    customerData: Auth;
    gender = false;

    constructor() {}

    ngOnInit(): void {
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
    }
}
