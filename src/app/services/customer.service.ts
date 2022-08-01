import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Customer, CustomerPasswordUpdating, CustomerUpdating } from "../models/customer.model";
import {
    CustomerPage,
    CustomerPageProfile,
} from "../models/customerPage.model";

@Injectable({
    providedIn: "root",
})
export class CustomerService {
    private jwtToken = "";
    private header: Object;

    constructor(private http: HttpClient) {
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        };
    }

    getCustomers(customerID: string): Observable<Customer[]> {
        const url =
            "https://citytourist.azurewebsites.net/api/v1/customers/" +
            customerID;
        return this.http
            .get<CustomerPage>(url, this.header)
            .pipe(map((res) => res.data));
    }

    // Get only 1 customer
    getCustomerProfile(customerID: string): Observable<Customer> {
        const url =
            `https://citytourist.azurewebsites.net/api/v1/customers/${customerID}`;

        return this.http
            .get<CustomerPageProfile>(url, this.header)
            .pipe(map((res) => res.data));
    }

    updateCustomer(customer: CustomerUpdating, newFile: File) {
        const url = "https://citytourist.azurewebsites.net/api/v1/customers";
        return this.http.put(url, this.toFormData(customer, newFile), this.header);
    }

    toFormData(
        customerUpdating: Partial<CustomerUpdating>,
        image: File
    ): FormData {
        const formData = new FormData();
        const payload = {
              ...customerUpdating,
              imagePath: "",
            // id: customerUpdating.id,
            // userName: customerUpdating.userName,
            // email: customerUpdating.email,
            // address: customerUpdating.address,
            // gender: customerUpdating.gender,

        };

        Object.keys(payload).forEach((key) =>
            formData.append(key, (payload as any)[key])
        );
        if (image != null) {
            formData.append("Image", image);
        }
        return formData;
    }

    // Update password
    updateCustomerPassword(customerPassword: CustomerPasswordUpdating) {
        const url = "https://citytourist.azurewebsites.net/api/v1/customers/update-password";
        return this.http.put(url, customerPassword, this.header);
    }
}
