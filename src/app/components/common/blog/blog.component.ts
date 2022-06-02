import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { City } from "src/app/models/city.model";
import { LandingPage } from "src/app/models/landingPage.model";
import { Quest } from "src/app/models/quest.model";
import { QuestType } from "src/app/models/questtype.model";
import { CityService } from "src/app/services/city.service";
import { QuestService } from "src/app/services/quest.service";
import { QuesttypeService } from "src/app/services/questtype.service";

@Component({
    selector: "app-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
    faStar = faStar;
    faLocationDot = faLocationDot;
    faCircleChevronRight = faCircleChevronRight;
    public questTypes: QuestType[] = new Array();
    public quests: Quest[] = new Array();
    public city: City[] = [];
    constructor(
        private questTypeService: QuesttypeService,
        private cityService: CityService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.questTypeService.getQuestTypes().subscribe((d: LandingPage) => {
            // this.questTypes = d.data;
            console.log("questTypes123", d.data);

            d.data.forEach((x) => {
                if (x.quests[0] != null) {
                    this.questTypes.push(x);
                    x.quests.forEach((e) => {
                        if (e.questTypeId == x.id) {
                            this.quests.push(e);
                        }
                    });
                }
            });
            console.log("questTypes", this.questTypes);
            console.log("quests", this.quests);
        });

        // City
        this.cityService.getCities().subscribe((d: City) =>{
            // this.city = d.data;


        })
    }

    // navigator
    goQuestDetails(questInfo: string) {
        localStorage.setItem("questInfo", questInfo);
        this.router.navigate(["single-blog"]);
    }
}
