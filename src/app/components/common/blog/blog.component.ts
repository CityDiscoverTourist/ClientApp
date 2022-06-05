import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { CityPage } from "src/app/models/CityPage.model";
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
    public cities: City[] = [];
    public areas: Area[] = new Array();

    constructor(
        private questTypeService: QuesttypeService,
        private cityService: CityService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.questTypeService.getQuestTypes().subscribe((d: LandingPage) => {
            // this.questTypes = d.data;
            // console.log("questTypes123", d.data);

            d.data.forEach((x) => {
                if (x.quests[0] != null) {
                    this.questTypes.push(x);

                    for( let i=0; i < 4; i++){
                        this.quests.push(x.quests[i]);
                        // console.log(this.quests);
                    }
                }
            });
            // console.log("questTypes", this.questTypes);
            // console.log("quests", this.quests);
        });

        // Get all City and Area
        this.cityService.getCities().subscribe((res: CityPage) =>{
            this.cities = res.data;
            console.log('city', res.data);

            res.data.forEach(x =>{
                if(x.areas[0] != null){
                    // console.log('area', x.areas);

                    x.areas.forEach(resArea =>{
                        // this.quests.forEach(resQuest =>{
                        //     if(resArea.id == resQuest.areaId){
                        //         this.area.push(resArea);
                        //     }
                        // })
                        this.areas.push(resArea);
                    })
                }
            })
            console.log('final area', this.areas);
        })

    }

    // navigator
    goQuestDetails(questInfo: string) {
        localStorage.setItem("questInfo", questInfo);
        this.router.navigate(["single-blog"]);
    }

    goListQuests(questTypeID : string){
        localStorage.setItem("questTypeID", questTypeID);
        this.router.navigate(["blog"]);
    }
}
