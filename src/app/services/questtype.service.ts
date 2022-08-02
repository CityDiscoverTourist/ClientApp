import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LandingPage } from "../models/landingPage.model";

@Injectable({
    providedIn: "root",
})
export class QuesttypeService {
    private lang : number = -1;
    private jwtToken = "";
    private header : Object;

    constructor(private http: HttpClient) {
        this.lang = Number(localStorage.getItem('lang'));
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        }
    }

    public questTypes$ = new BehaviorSubject<LandingPage>(null);

    getQuestTypes(langNumber : number) {
        let status = 'active';
        let url = `https://citytourist.azurewebsites.net/api/v1/quest-types/?Status=${status}&language=${langNumber}`;
        return this.http.get<LandingPage>(url,this.header).subscribe((res) =>{
            this.questTypes$.next(res);
            console.log('questTypes$',this.questTypes$);
        });
    }

    getQuestTypeByID(questTypeID: string){
        let url = `https://citytourist.azurewebsites.net/api/v1/quest-types/${questTypeID}`;
        if(this.lang == 0){
            url = url + `?language=${this.lang}`;
        }
        return this.http.get<LandingPage>(url, this.header);
    }


    //////


    getNewQuestType(langNumber : number) {
        let status = 'active';
        let url = `https://citytourist.azurewebsites.net/api/v1/quest-types/?Status=${status}&language=${langNumber}`;
        return this.http.get<LandingPage>(url,this.header);
    }

}
