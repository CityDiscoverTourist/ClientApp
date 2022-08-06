import { Component, OnInit } from "@angular/core";
import { Quest, QuestParam } from "src/app/models/quest.model";
import { QuestService } from "src/app/services/quest.service";
// Icons:
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { QuesttypeService } from "src/app/services/questtype.service";
import { QuestType } from "src/app/models/questtype.model";
import { CityService } from "src/app/services/city.service";
// import { CityPage } from "src/app/models/CityPage.model";
import { CityPage } from "src/app/models";
import { City } from "src/app/models/city.model";
import { Area } from "src/app/models/area.model";
import { QuestPage } from "src/app/models/questPage.model";
import { LandingPage } from "src/app/models/landingPage.model";

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
        private questTypeService: QuesttypeService,
        private cityService: CityService,
        private router: Router
    ) {}

    public quests: Quest[] = [];
    public questTypes: QuestType[] = [];
    public questTypeID : number;
    public cities: City[] = [];
    public areas: Area[] = new Array();
    public param: QuestParam;

    // Paging
    public totalCount : number = 0;
    public totalPages : number = 0;
    public pageSize : number = 0;
    public currentPage : number = 0;
    public hasNext : string = '';
    public hasPrevious : string = '';

    public questPage : QuestPage;
    ngOnInit(): void {

        this.questTypeID = Number(sessionStorage.getItem('questTypeID'));

        this.param = {
            "questName" : '',
            "questTypeID": this.questTypeID,
            "currentPage" : 1,
            "pageSize": 8
        };

        this.questService.getQuestByParams(this.param);
        this.questService.data$.subscribe(res =>{
            this.quests = (!!res && !!res.data) ? res.data : undefined;
            if(!!res && !!res.pagination){
                this.totalCount = res.pagination.totalCount;
                this.totalPages = res.pagination.totalPages;
                this.pageSize = res.pagination.pageSize;
                this.currentPage = res.pagination.currentPage;
                this.hasNext = res.pagination.hasNext;
                this.hasPrevious = res.pagination.hasPrevious;
            }
        })

        this.questTypeService.questTypes$.subscribe((res:LandingPage) =>{
            this.questTypes = (!!res && !!res.data) ? res.data : undefined;
        })

        // Get City
        this.cityService.getCities().subscribe((res: CityPage) =>{
            this.cities = res.data;

            res.data.forEach(x =>{
                if(x.areas[0] != null){
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
        })



    }


    goQuestDetails(questInfo: string) {
        sessionStorage.setItem("questInfo", questInfo);
        this.router.navigate(["single-quest"]);
    }

    // Phân trang

    public currentPageCommon : number = 0;

    getPaging(currentPage: string){
        this.currentPageCommon = Number(currentPage);

        let param = {
            "questName" : '',
            "questTypeID": this.questTypeID,
            "currentPage" : Number(currentPage),
            "pageSize": 8
        };

        this.questService.getQuestByParams(param);
        this.questService.data$.subscribe(res =>{
        this.quests = (!!res && !!res.data) ? res.data : undefined;
        })
    }

    getPagingArrow(arrow : string){
        let currentPage = this.currentPageCommon;

        if(currentPage == 0){
            if(arrow == 'prev'){
                currentPage = 1;
            }
            if(arrow == 'next'){
                if(this.totalPages >= 2){
                    currentPage = 2;
                }else{
                    currentPage = 1;
                }
            }
        }else{
            if(arrow == 'prev'){
                if(currentPage > 1){
                    currentPage--;
                }
            }
            if(arrow == 'next'){
                if(currentPage < this.totalPages){
                    currentPage++;
                }
            }
        }
        this.currentPageCommon = currentPage

        let param = {
            "questName" : '',
            "questTypeID": this.questTypeID,
            "currentPage" : Number(currentPage),
            "pageSize": 8
        };

        this.questService.getQuestByParams(param);
        this.questService.data$.subscribe(res =>{
            this.quests = (!!res && !!res.data) ? res.data : undefined;
        })
    }

    countNumberPage(totalPages){
        return new Array(totalPages);
    }
}
