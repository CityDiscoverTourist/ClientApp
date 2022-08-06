import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-payment-success",
    templateUrl: "./payment-success.component.html",
    styleUrls: ["./payment-success.component.scss"],
})
export class PaymentSuccessComponent implements OnInit {
    public linkResponseMomo = "";
    public playingCode = "";
    public isSuccess = false;
    constructor() {
        this.linkResponseMomo = window.location.href;

    }

    ngOnInit(): void {
        let playingCodeTmp = sessionStorage.getItem("playingCode");
        if(playingCodeTmp != null || playingCodeTmp != ""){
            this.playingCode = playingCodeTmp;
        }
        // Check Payment success or fail
        if (this.linkResponseMomo.includes("successfully")) {
            this.isSuccess = true;
        } else if (this.linkResponseMomo.includes("expired")) {
        }
    }
}
