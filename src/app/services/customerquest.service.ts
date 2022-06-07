import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
