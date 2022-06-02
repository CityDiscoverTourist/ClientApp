import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LandingPage } from '../models/landingPage.model';
import { QuestType } from '../models/questtype.model';

@Injectable({
  providedIn: 'root'
})
export class QuesttypeService {

  constructor(private http: HttpClient) { }

  getQuestTypes(){
      const url = "https://citytourist.azurewebsites.net/api/v1/quest-types";

      return this.http.get<LandingPage>(url);
  }
}
