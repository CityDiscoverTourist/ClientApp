import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerQuest } from '../models/customerQuest.model';
import { CustomerQuestPage } from '../models/customerQuestPage.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerquestService {

  constructor(private http: HttpClient) { }

  getCustomerQuestByQuestID(questID : string){
    const url = "https://citytourist.azurewebsites.net/api/v1/customer-quests?QuestId="+questID;
    return this.http.get<CustomerQuestPage>(url);
  }

  getCustomerQuests(customerQuestID : string){
      const url = "https://citytourist.azurewebsites.net/api/v1/customer-quests/"+customerQuestID;
      return this.http.get<CustomerQuestPage>(url);
  }

  createCustomerQuest(customerQuest : CustomerQuest){
    const url = "https://citytourist.azurewebsites.net/api/v1/customer-quests";
    return this.http.post<CustomerQuest>(url, customerQuest);
  }

}
