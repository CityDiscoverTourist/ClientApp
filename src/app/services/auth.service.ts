import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountRegistration } from "../models/auth.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    registerCustomer(account:AccountRegistration){
        const url = "https://citytourist.azurewebsites.net/api/v1/auths/register-account";
        return this.http.post(url, account);
    }
}
