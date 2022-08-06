import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountRegistration, Auth, UserLogin } from "../models/auth.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private jwtToken = "";
    private header: Object;

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

    registerCustomer(account:AccountRegistration){
        this.getHeader();
        const url = "https://citytourist.azurewebsites.net/api/v1/auths/register-account";
        return this.http.post(url, account, this.header);
    }

    loginCustomer(account:UserLogin){
        this.getHeader();
        const url = "https://citytourist.azurewebsites.net/api/v1/auths/login";
        return this.http.post<Auth>(url, account, this.header);
    }

    forgotPassword(email:string){
        this.getHeader();
        const url = `https://citytourist.azurewebsites.net/api/v1/auths/forgot-password?email=${email}`;
        return this.http.post(url,"", this.header);
    }
}
