import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer, CustomerUpdating } from "../models/customer.model";
import { CustomerPage } from "../models/customerPage.model";

@Injectable({
    providedIn: "root",
})
export class CustomerService {
    private jwtToken = "";
    private header : Object;

    constructor(private http: HttpClient) {
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        }
    }

    getCustomers(customerID : string){
        const url = "https://citytourist.azurewebsites.net/api/v1/customers/"+customerID;
        return this.http.get<CustomerPage>(url, this.header);
    }

    updateCustomer(customer: CustomerUpdating){
        const url = "https://citytourist.azurewebsites.net/api/v1/customers";
        return this.http.put(url, customer)
    }
}
