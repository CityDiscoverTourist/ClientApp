import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
    selector: "app-manage-account",
    templateUrl: "./manage-account.component.html",
    styleUrls: ["./manage-account.component.scss"],
})
export class ManageAccountComponent implements OnInit {


    constructor(private behaviorObject: BehaviorsubjectService, private router: Router) {}

    ngOnInit(): void {
        // this.behaviorObject.isLogin$.subscribe((res) => {
        //     this.sessionLogin = res;
        //     console.log("res", res);
        //     if (this.sessionLogin != null) {
        //         this.customerData = JSON.parse(
        //             localStorage.getItem("CustomerData")
        //         );
        //     }
        // });

    }
    goAccountInfo(){
        this.router.navigate(["account-info"]);
    }
    goAccountHistory(){
        this.router.navigate(["account-history"]);
    }
}
