import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LinkMomo, Payment, PaymentPage } from "../models/payment.model";

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    constructor(private http: HttpClient) {}

    createPayment(payment: Payment) {
        console.log('payment', payment);

        const url = "https://citytourist.azurewebsites.net/api/v1/payments";
        return this.http.post<LinkMomo>(url, payment);
    }


}
