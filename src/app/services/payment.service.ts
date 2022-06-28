import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Payment } from "../models/payment.model";

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    constructor(private http: HttpClient) {}

    createPayment(payment: Payment) {
        const url = "https://citytourist.azurewebsites.net/api/v1/payments";
        return this.http.post(url, payment);
    }


}
