import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgToastService } from "ng-angular-popup";

@Injectable({
    providedIn: "root",
})
export class FacebookService {
    private jwtToken = "";
    private header : Object;

    constructor(
        private http: HttpClient,
        private ngToastService: NgToastService
    ) {
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        }
    }
    // Model
    FacebookModel = {
        idProvider: "",
        jwtToken: "",
        email: "",
        accountId: "",
        fullName: "",
        imagePath: "",
        refreshToken: "",
        refreshTokenExpiryTime: null,
    };

    // Login Facebook
    loginWithFacebook(authToken) {
        const url = `https://citytourist.azurewebsites.net/api/v1/auths/login-facebook?resource=${authToken}&deviceId='abc'`;
        return this.http.post(url, this.header);
    }
}
