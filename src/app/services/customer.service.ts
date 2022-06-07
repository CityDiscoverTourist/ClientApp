import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerPage } from "../models/customerPage.model";

@Injectable({
    providedIn: "root",
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    getCustomers(customerID : string){
        const url = "https://citytourist.azurewebsites.net/api/v1/customers/"+customerID;
        return this.http.get<CustomerPage>(url);
    }
}
