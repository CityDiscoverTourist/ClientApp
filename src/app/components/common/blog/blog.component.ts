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

    public questTypes: QuestType[] = new Array();
    public quests: Quest[] = new Array();
    public cities: City[] = [];
    public areas: Area[] = new Array();
    public customerQuests: CustomerQuest[] = [];
    public totalFeedback;
    public questActive : Quest[] = new Array();

    constructor(
        private questTypeService: QuesttypeService,
        private cityService: CityService,
        private customerQuestService: CustomerquestService,
        private router: Router
    ) {}

    ngOnInit(){
        this.questTypeService.getQuestTypes("").subscribe((d: LandingPage) => {
            // this.questTypes = d.data;
            // console.log("questTypes123", d.data);

            d.data.forEach((x) => {
                // if (x.quests[0] != null) {
                //     this.questTypes.push(x);

                //     for( let i=0; i < 4; i++){
                //         this.quests.push(x.quests[i]);

                //     }
                // }

                // Check xem có Quest nào không
                if (x.quests[0] != null) {
                    // check xem Quest đó status có Active không
                    // questActive = x.quests.filter(f => f.status == "Active" || f.status == "active");
                    this.questActive = x.quests.filter(f =>  f.status == "Active" || f.status == "active");
                    this.questActive.reverse(); // Sort DESC ID giảm dần

                    this.questTypes.push(x);

                    for( let i=0; i < 4; i++){
                        // this.quests.push(x.quests[i]);
                        this.quests.push(this.questActive[i]);
                    }
                }

            });
            // console.log("questTypes", this.questTypes);
            console.log('this.quests', this.quests);
            // console.log('questActive', this.questActive);


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

        // Get all CustomerQuest to get total feedback
        this.customerQuestService.getCustomerQuests("").subscribe(res =>{
            this.customerQuests = res.data;

        //     console.log('this.customerQuest', this.customerQuests);
        //     this.quests.forEach(resQuest =>{
        //         this.customerQuests.forEach(resCQ =>{
        //             if(resQuest.id == resCQ.questId && resCQ.feedBack != null){
        //                 console.log('acbbbbbb');


        //             }
        //         })
        //     })
        })



    }



    // navigator
    goQuestDetails(questInfo: string, questTypeID: string) {
        sessionStorage.setItem("questInfo", questInfo);
        sessionStorage.setItem("questTypeID", questTypeID);
        this.router.navigate(["single-quest"]);

    }

    goListQuests(questTypeID : string){
        sessionStorage.setItem("questTypeID", questTypeID);
        this.router.navigate(["quest"]);
    }


}
