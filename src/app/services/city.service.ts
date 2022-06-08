import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CityPage } from "../models";
// import { CityPage } from "../models/CityPage.model";

@Injectable({
    providedIn: "root",
})
export class CityService {
    constructor(private http: HttpClient) {}

    getCities(){
        const url = "https://citytourist.azurewebsites.net/api/v1/cites";
        return this.http.get<CityPage>(url);
    }
}
