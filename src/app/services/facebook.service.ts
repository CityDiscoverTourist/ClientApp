import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgToastService } from "ng-angular-popup";

@Injectable({
    providedIn: "root",
})
export class FacebookService {
    constructor(
        private http: HttpClient,
        private ngToastService: NgToastService
    ) {}

    // Login Facebook
    loginWithFacebook(authToken){
        const url = `https://citytourist.azurewebsites.net/api/v1/auths/login-facebook?resource=${authToken}`;
        return this.http.post(url, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Accept: "text/plain",
            }),
            responseType: "text",
        });
    }
}
