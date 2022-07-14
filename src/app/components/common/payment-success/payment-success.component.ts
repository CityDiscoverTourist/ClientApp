import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-payment-success",
    templateUrl: "./payment-success.component.html",
    styleUrls: ["./payment-success.component.scss"],
})
export class PaymentSuccessComponent implements OnInit {
    public linkMomo = "";
    public playingCode = "";
    public isSuccess = false;
    constructor() {}

    ngOnInit(): void {
        this.linkMomo = sessionStorage.getItem("linkMomo");
        let playingCodeTmp = sessionStorage.getItem("playingCode");
        if(playingCodeTmp != null || playingCodeTmp != ""){
            this.playingCode = playingCodeTmp;
        }
        // Check Payment success or fail
        if (this.linkMomo.includes("success")) {
            this.isSuccess = true;
            console.log("payment-success");
        } else if (this.linkMomo.includes("expired")) {
            console.log("payment-fail");
        }
    }
}
