import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LandingPage } from "../models/landingPage.model";

@Injectable({
    providedIn: "root",
})
export class QuesttypeService {
    constructor(private http: HttpClient) {}

    getQuestTypes(questTypeID: string) {
        let url = "https://citytourist.azurewebsites.net/api/v1/quest-types/";
        if (questTypeID == "") {
            url = url + "?Status=active";
        } else {
            url = url + questTypeID;
        }
        return this.http.get<LandingPage>(url);
    }
}
