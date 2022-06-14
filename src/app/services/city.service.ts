import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

    // cách lấy map data cần thiết
    // getCities(){
    //     const url = "https://citytourist.azurewebsites.net/api/v1/cites";
    //     return this.http.get<CityPage>(url).pipe(map((data:CityPage)=>{
    //         return {id:1} as CityPage
    //     }))
    // }
}
