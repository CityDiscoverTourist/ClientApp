import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { QuestPage } from "../models/questPage.model";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { QuestParam } from "../models/quest.model";

@Injectable({
    providedIn: "root",
})
export class QuestService {
    private jwtToken = "";
    private header : Object;

    private lang : number = -1;
    constructor(private http: HttpClient) {
        let langTmp = localStorage.getItem('lang');
        if(langTmp != null){
            this.lang = Number(langTmp);
        }
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

    // lang = localStorage.getItem('lang');
    getQuests(id: string) {
        this.getHeader();
        let url = `https://citytourist.azurewebsites.net/api/v1/quests/${id}`;
        if(this.lang == 0){
            url = url + `?language=${this.lang}`;
        }
        return this.http.get<QuestPage>(url,this.header);
    }

    getAllQuest(){
        this.getHeader();
        const pageSize = 200;
        let url = `https://citytourist.azurewebsites.net/api/v1/quests?pagesize=${pageSize}`;
        if(this.lang == 0){
            url = url + `&language=${this.lang}`;
        }
        return this.http.get<QuestPage>(url,this.header);
    }

    // 8items / 1page
    // getQuestsByType(id: string, currentPage: string): Observable<QuestPage> {
    //     const pageSize = 8;
    //     const url =
    //         "https://citytourist.azurewebsites.net/api/v1/quests?Status=active&PageSize=" +
    //         pageSize +
    //         "&PageNumber=" +
    //         currentPage +
    //         "&QuestTypeId=" +
    //         id;
    //     return this.http.get<QuestPage>(url);
    // }

    getPaging(currentPage: string, pageSize: string) {
        this.getHeader();
        const url =
            "https://citytourist.azurewebsites.net/api/v1/quests?Status=active&PageNumber=" +
            currentPage +
            "&PageSize=" +
            pageSize;
        return this.http.get<QuestPage>(url,this.header);
    }

    public data$ = new BehaviorSubject<QuestPage>(null);

    getQuestByParams(param: QuestParam) {
        this.getHeader();
        const status = "active";
        let url =
            "https://citytourist.azurewebsites.net/api/v1/quests?Status="+status+
            "&PageSize="+param.pageSize+
            "&PageNumber="+param.currentPage+
            "&QuestTypeId="+param.questTypeID+
            "&Name="+param.questName;

        if(this.lang == 0){
            url = url + `&language=${this.lang}`;
        }
        return this.http.get<QuestPage>(url,this.header).subscribe((res)=>{
            this.data$.next(res);

        });

    }
}
