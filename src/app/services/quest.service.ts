import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quests } from '../models/quest.model';


@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private http: HttpClient) { }

  getQuests(){
      const url = "https://citytourist.azurewebsites.net/api/v1/quests";

      return this.http.get<Quests>(url);
  }
}
