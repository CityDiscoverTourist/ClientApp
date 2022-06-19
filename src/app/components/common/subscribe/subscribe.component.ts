import { Component, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/quest.model';
import { QuestPage } from 'src/app/models/questPage.model';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
    public questName : string = "";
    public quests: Quest[] = [];



    constructor(private questService : QuestService) {}

  ngOnInit(): void {
  }

  searchQuestByName(){
    this.questService.searchQuestByName(this.questName).subscribe((res:QuestPage) =>{


    })
  }

}
