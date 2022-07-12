import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";

@Injectable({
    providedIn: "root",
})
export class UserSubscribedService {
    constructor(private http: HttpClient) {}

    createContact(contact:Contact){
        const url = "https://citytourist.azurewebsites.net/api/v1/user-subscribeds";
        return this.http.post<Contact>(url, contact);
    }

}
