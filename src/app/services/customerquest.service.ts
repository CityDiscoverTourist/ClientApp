import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerQuest } from '../models/customerQuest.model';
import { CustomerQuestPage } from '../models/customerQuestPage.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerquestService {
    private jwtToken = "";
    private header : Object;

    constructor(private http: HttpClient) {
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        }
    }

    getCustomerQuestByQuestID(questID : string){
        const url = "https://citytourist.azurewebsites.net/api/v1/customer-quests?QuestId="+questID;
        return this.http.get<CustomerQuestPage>(url, this.header);
    }

    getCustomerQuests(customerQuestID : string){
        const url = "https://citytourist.azurewebsites.net/api/v1/customer-quests/"+customerQuestID;
        return this.http.get<CustomerQuestPage>(url, this.header);
    }

    createCustomerQuest(customerQuest : CustomerQuest){
        const url = "https://citytourist.azurewebsites.net/api/v1/customer-quests";
        return this.http.post<CustomerQuestPage>(url, customerQuest, this.header);
    }

}
