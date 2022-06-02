import { Component, OnInit } from "@angular/core";
import { Quest } from "src/app/models/quest.model";
import { QuestService } from "src/app/services/quest.service";
// Icons:
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-blog-page",
    templateUrl: "./blog-page.component.html",
    styleUrls: ["./blog-page.component.scss"],
})
export class BlogPageComponent implements OnInit {
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    faStar = faStar;
    faLocationDot = faLocationDot;
    faCircleChevronRight = faCircleChevronRight;

    constructor(
        private questService: QuestService,
        private translateService: TranslateService
    ) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }
    public quests: Quest;
    ngOnInit(): void {
        //   this.questService.getQuests().subscribe((res: Quests) =>{
        //   this.quests.data = res.data;
        //   })
    }
}
