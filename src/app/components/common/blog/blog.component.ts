import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
// import { CityPage } from "src/app/models/CityPage.model";
import { CityPage } from "src/app/models/";
import { CustomerQuest } from "src/app/models/customerQuest.model";
import { LandingPage } from "src/app/models/landingPage.model";
import { Quest } from "src/app/models/quest.model";
import { QuestType } from "src/app/models/questtype.model";
import { CityService } from "src/app/services/city.service";
import { CustomerquestService } from "src/app/services/customerquest.service";
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

    public questTypes: QuestType[] = [];
    public quests: Quest[] = new Array();
    public cities: City[] = [];
    public areas: Area[] = new Array();
    // public customerQuests: CustomerQuest[] = [];
    // public totalFeedback;
    public questActive: Quest[] = new Array();
    public questTmp: Quest[] = new Array();
    public size = 0;
    constructor(
        private questTypeService: QuesttypeService,
        private cityService: CityService,
        private router: Router
    ) {}

    ngOnInit() {
        this.questTypeService.questTypes$.subscribe((res: LandingPage) => {
            this.quests = []; // reset Quests
            this.questActive = []; // reset Quest Active
            this.questTypes = []; // reset Quest Type
            this.questTmp = []; // reset Quesst Tmp

            res?.data.forEach((x: QuestType) => {
                // Check xem Quest Type có Quest nào không
                if (x.quests[0] != null) {
                    // check xem Quest đó status có Active không
                    this.questActive = x.quests.filter(
                        (f) => f.status == "Active" || f.status == "active"
                    );
                    this.questActive.reverse(); // Sort DESC ID giảm dần

                    this.questTypes.push(x);

                    for (let i = 0; i < this.questActive.length; i++) {
                        // this.quests.push(x.quests[i]);
                        if (i >= 4) continue;
                        this.questTmp.push(this.questActive[i]);
                    }
                }
                let tmp: Quest[];
                tmp = []; // reset tmp
                tmp = this.questTmp.filter((f) => typeof f !== "undefined");
                this.quests = tmp;
            });

        });


        // Get all City and Area
        this.cityService.getCities().subscribe((res: CityPage) => {
            this.cities = res.data;

            res.data.forEach((x) => {
                if (x.areas[0] != null) {

                    x.areas.forEach((resArea) => {
                        this.areas.push(resArea);
                    });
                }
            });
        });
    }

    // navigator
    goQuestDetails(questID: string, questTypeID: string) {
        sessionStorage.setItem("questInfo", questID);
        sessionStorage.setItem("questTypeID", questTypeID);

        this.router.navigate(["single-quest"]);
    }

    goListQuests(questTypeID: string) {
        sessionStorage.setItem("questTypeID", questTypeID);
        this.router.navigate(["quest"]);
    }

    eventMatch(quests: Quest[]) {
        var count = 0;

        for (let y of quests) {
            if (y.status.toLowerCase()!='inactive') {
                count++;
            }
        }

        if (count > 4) return true;
        return false;
    }
}
