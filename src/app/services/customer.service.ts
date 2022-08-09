import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
    Customer,
    CustomerPasswordUpdating,
    CustomerUpdating,
} from "../models/customer.model";
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

    }

    getHeader(){
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        };
    }

    getCustomers(customerID: string): Observable<Customer[]> {
        this.getHeader();
        const url =
            "https://citytourist.azurewebsites.net/api/v1/customers/" +
            customerID;
        return this.http
            .get<CustomerPage>(url, this.header)
            .pipe(map((res) => res.data));
    }

    // Get only 1 customer
    getCustomerProfile(customerID: string): Observable<Customer> {
        this.getHeader();
        const url = `https://citytourist.azurewebsites.net/api/v1/customers/${customerID}`;
        return this.http
            .get<CustomerPageProfile>(url, this.header)
            .pipe(map((res) => res.data));
    }

    updateCustomer(customer: CustomerUpdating, newFile: File) {
        console.log('customer',customer);
        console.log('newFile',newFile);

        this.getHeader();
        const url = "https://citytourist.azurewebsites.net/api/v1/customers";
        // console.log('this.toFormData(customer, newFile)',this.toFormData(customer, newFile));

        return this.http.put(
            url,
            this.toFormData(customer, newFile),
            this.header
        );
        // const formData = new FormData();
        // formData.set('Id', '4ddabed9-c00e-499d-b700-e498a02cf551');
        // formData.set('Address', 'dia chi');
        // formData.set('Email', 'nguyenchicuong304@gmail.com');
        // formData.set('FullName', 'ho ten');
        // formData.set('Gender', 'true');

        // return this.http.put(
        //     url,
        //     this.toFormData(customer, newFile),
        //     this.header
        // );
    }

    toFormData(
        customerUpdating: Partial<CustomerUpdating>,
        image: File
    ): FormData {
        const formData = new FormData();
        const payload = {
            //   ...customerUpdating,
            //   imagePath: "",
            id: customerUpdating.id,
            userName: customerUpdating.userName,
            // userName:"",
            email: customerUpdating.email,
            address: customerUpdating.address,
            gender: customerUpdating.gender,
            fullname: customerUpdating.fullName,
        };


        Object.keys(payload).forEach((key) =>{
            formData.append(key, (payload as any)[key])
        }
        );

        if (image != undefined) {
            formData.append("image", image);
        }

        console.log('formData',formData);

        return formData;
    }

    // Update password
    updateCustomerPassword(customerPassword: CustomerPasswordUpdating) {
        this.getHeader();
        const url =
            "https://citytourist.azurewebsites.net/api/v1/customers/update-password";
        return this.http.put(url, customerPassword, this.header);
    }
}
