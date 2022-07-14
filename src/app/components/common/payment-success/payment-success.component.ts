import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-payment-success",
    templateUrl: "./payment-success.component.html",
    styleUrls: ["./payment-success.component.scss"],
})
export class PaymentSuccessComponent implements OnInit {
    public linkMomo = "";
    public isSuccess = false;
    constructor() {}

    ngOnInit(): void {
        this.linkMomo = sessionStorage.getItem("linkMomo");
        if(this.linkMomo.search("success")){
            this.isSuccess = true;
            console.log("payment-success");
        }else if(this.linkMomo.search("expired")){
            console.log("payment-fail");
        }
    }
}
