import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestPage } from '../models/questPage.model';


@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private http: HttpClient) { }

  getQuests(id:string){
    const url = "https://citytourist.azurewebsites.net/api/v1/quests/"+id;
    return this.http.get<QuestPage>(url);

  }

  // 8items / 1page
  getQuestsByType(id:string, currentPage:string){
    const pageSize = 8;
    const url =
    "https://citytourist.azurewebsites.net/api/v1/quests?PageSize="+pageSize+"&PageNumber="+currentPage+"&QuestTypeId="+id;
    return this.http.get<QuestPage>(url);
  }

  getPaging(currentPage:string, pageSize:string){
    const url = 'https://citytourist.azurewebsites.net/api/v1/quests?PageNumber='+currentPage+'&PageSize='+pageSize;
    return this.http.get<QuestPage>(url);
  }

}
