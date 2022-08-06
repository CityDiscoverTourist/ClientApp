import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";

@Injectable({
    providedIn: "root",
})
export class UserSubscribedService {
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

    createContact(contact:Contact){
        this.getHeader();
        const url = "https://citytourist.azurewebsites.net/api/v1/user-subscribeds";
        return this.http.post<Contact>(url, contact, this.header);
    }

}
