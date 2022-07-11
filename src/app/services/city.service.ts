import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CityPage } from "../models";
import { BearerService } from "./bearer.service";
// import { CityPage } from "../models/CityPage.model";

@Injectable({
    providedIn: "root",
})
export class CityService {
    private jwtToken = "";
    private header : Object;

    constructor(private http: HttpClient) {
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        };
    }

    getCities(){
        let url = "https://citytourist.azurewebsites.net/api/v1/cites";

        return this.http.get<CityPage>(url, this.header);
    }

    // cách lấy map data cần thiết
    // getCities(){
    //     const url = "https://citytourist.azurewebsites.net/api/v1/cites";
    //     return this.http.get<CityPage>(url).pipe(map((data:CityPage)=>{
    //         return {id:1} as CityPage
    //     }))
    // }
}
