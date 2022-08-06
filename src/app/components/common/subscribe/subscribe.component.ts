import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Quest, QuestParam } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { QuestService } from "src/app/services/quest.service";

@Component({
    selector: "app-subscribe",
    templateUrl: "./subscribe.component.html",
    styleUrls: ["./subscribe.component.scss"],
})
export class SubscribeComponent implements OnInit {
    public questName: string = "";
    public quests: Quest[];
    public questTypeID: number = 0;
    public quests$;
    public param: QuestParam;

    constructor(private questService: QuestService) {}

    ngOnInit(): void {


        this.questTypeID = Number(sessionStorage.getItem("questTypeID"));

    }

    searchQuestByName() {
        this.param = {
            "questName" : this.questName,
            "questTypeID": this.questTypeID,
            "currentPage" : 1,
            "pageSize": 8
        };
        this.questService.getQuestByParams(this.param);

    }
}
