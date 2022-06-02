import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quest } from '../models/quest.model';


@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private http: HttpClient) { }

  getQuests(id:string){
      if(id == "" || id.length == 0){
        const url = "https://citytourist.azurewebsites.net/api/v1/quests";
        return this.http.get<Quest>(url);
      }else{
        const url = "https://citytourist.azurewebsites.net/api/v1/quests/"+id;
        return this.http.get<Quest>(url);
      }
  }


  get4Quests(){
    const url = "https://citytourist.azurewebsites.net/api/v1/quests?&PageSize=4";
    return this.http.get<Quest>(url);
  }


  getQuestsByType(id:string){
    const url = "https://citytourist.azurewebsites.net/api/v1/quests?QuestTypeId="+id;
    return this.http.get<Quest>(url);
  }

}
