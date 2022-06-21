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
        // this.questService.data$.subscribe((data) => {
        //     console.log("aaa");

        //     console.log(data);
        // });

        this.questTypeID = Number(sessionStorage.getItem("questTypeID"));
        // const currentPage = '1';
        // this.questService.searchQuestByName("", "1", "9", "8",8);
        // this.questService.data$.subscribe((data)=>{
        //     console.log("aaa");

        //     console.log(data);

        // })
    }

    searchQuestByName() {
        // this.questTypeID = sessionStorage.getItem("questTypeID");
        // this.questService.searchQuestByName(this.questName, this.questTypeID).subscribe((res:QuestPage) =>{
        //     // sessionStorage.setItem('searchQuest', JSON.stringify(res));
        //     this.quests$ = new BehaviorSubject<QuestPage>(res);
        //     // console.log('res', res);

        // })
        // const currentPage = '1';
        this.param = {
            "questName" : this.questName,
            "questTypeID": this.questTypeID,
            "currentPage" : 1,
            "pageSize": 8
        };
        this.questService.getQuestByParams(this.param);
        // this.questService.data$.subscribe((data)=>{
        //     console.log("aaa");

        //     console.log(data);

        // })
    }
}
