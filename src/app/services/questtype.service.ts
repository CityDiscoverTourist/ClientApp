import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LandingPage } from "../models/landingPage.model";

@Injectable({
    providedIn: "root",
})
export class QuesttypeService {
    constructor(private http: HttpClient) {}
    // public langNumber = Number(sessionStorage.getItem('lang'));

    public questTypes$ = new BehaviorSubject<LandingPage>(null);

    getQuestTypes(langNumber : number) {
        let status = 'active';
        let url = `https://citytourist.azurewebsites.net/api/v1/quest-types/?Status=${status}&language=${langNumber}`;
        return this.http.get<LandingPage>(url).subscribe((res) =>{
            this.questTypes$.next(res);
            console.log('questTypes$',this.questTypes$);
        });
    }

    getQuestTypeByID(questTypeID: string){
        let url = `https://citytourist.azurewebsites.net/api/v1/quest-types/${questTypeID}`;
        return this.http.get<LandingPage>(url);
    }

}
