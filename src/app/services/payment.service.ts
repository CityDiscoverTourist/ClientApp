import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LinkMomo, Payment, PaymentPage } from "../models/payment.model";
import { BearerService } from "./bearer.service";

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    private jwtToken;
    constructor(private http: HttpClient, private bearerService : BearerService) {
    }

    createPayment(payment: Payment) {
        console.log('payment', payment);

        const url = "https://citytourist.azurewebsites.net/api/v1/payments";
        return this.http.post<LinkMomo>(url, payment);
    }

    // find Payment by CustomerId - tra lịch sử đơn hàng của Customer
    getPaymentByCustomerId(customerID : string){
        const paySize = 100;
        this.jwtToken = localStorage.getItem("jwtToken");
        const url = `https://citytourist.azurewebsites.net/api/v1/payments?PageSize=${paySize}&CustomerId=${customerID}&`;
        return this.http.get<PaymentPage>(url, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `${this.jwtToken}`,
            }),
        });
    }

}
