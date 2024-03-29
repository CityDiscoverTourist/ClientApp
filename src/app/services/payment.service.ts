import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LinkMomo, Payment, PaymentPage, VoucherChecking, VoucherResponse } from "../models/payment.model";

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    private jwtToken = "";
    private header : Object;
    constructor(private http: HttpClient) {
    }

    getHeader(){
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        };
    }

    createPayment(payment: Payment, voucher : string) {
        this.getHeader();

        let url = ""
        if(voucher == ''){
            url = `https://citytourist.azurewebsites.net/api/v1/payments`;
        }else{
            url = `https://citytourist.azurewebsites.net/api/v1/payments?discountCode=${voucher}`;
        }

        return this.http.post<LinkMomo>(url, payment, this.header);
    }

    // find Payment by CustomerId - tra lịch sử đơn hàng của Customer
    getPaymentByCustomerId(customerID : string){
        this.getHeader();
        const paySize = 100;
        this.jwtToken = localStorage.getItem("jwtToken");
        // const url = `https://citytourist.azurewebsites.net/api/v1/payments?PageSize=${paySize}&CustomerId=${customerID}&`;
        const url = `https://citytourist.azurewebsites.net/api/v1/payments/get-by-customer-id?PageSize=${paySize}&CustomerId=${customerID}`;
        return this.http.get<PaymentPage>(url, this.header);
    }

    applyVoucher(voucherChecking: VoucherChecking) {
        this.getHeader();
        const url = `https://citytourist.azurewebsites.net/api/v1/payments/check-coupon?couponCode=${voucherChecking.couponCode}&customerId=${voucherChecking.customerId}&totalPrice=${voucherChecking.totalPrice}`;
        return this.http.post<VoucherResponse>(url, '',this.header);
    }

}
