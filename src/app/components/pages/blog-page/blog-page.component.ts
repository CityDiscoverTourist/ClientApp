import { Component, OnInit } from "@angular/core";
import { Quest } from "src/app/models/quest.model";
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
    public questTypeID : string;
    public cities: City[] = [];
    public areas: Area[] = new Array();
    // Paging
    public totalCount : number = 0;
    public totalPages : number = 0;
    public pageSize : number = 0;
    public currentPage : number = 0;
    public hasNext : string = '';
    public hasPrevious : string = '';

    ngOnInit(): void {
        this.questTypeID = localStorage.getItem('questTypeID');
        const currentPage = '1';
        this.questService.getQuestsByType(this.questTypeID, currentPage).subscribe(res =>{
            this.quests = res.data;
            // console.log('quests', this.quests);

            this.totalCount = res.pagination.totalCount;
            this.totalPages = res.pagination.totalPages;
            this.pageSize = res.pagination.pageSize;
            this.currentPage = res.pagination.currentPage;
            this.hasNext = res.pagination.hasNext;
            this.hasPrevious = res.pagination.hasPrevious;

            console.log('totalCount: '+this.totalCount+' ,totalPages: '+this.totalPages+' ,pageSize: '+
            this.pageSize+' ,currentPage: '+ this.currentPage+' ,hasNext: '+this.hasNext+' ,hasPrevious: '+this.hasPrevious);

        })

        this.questTypeService.getQuestTypes("").subscribe(res =>{
            this.questTypes = res.data;
            // console.log('quest type', this.questTypes);

        })

        // Get City
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


    goQuestDetails(questInfo: string) {
        localStorage.setItem("questInfo", questInfo);
        this.router.navigate(["single-blog"]);
    }

    public changeColorAt : number;
    getPaging(currentPage: string){
        console.log('currentPage: ', currentPage);
        this.questService.getQuestsByType(this.questTypeID, currentPage).subscribe(res =>{
            this.quests = res.data;
        })
        this.changeColorAt = +currentPage;
        console.log('changeColorAt: ', this.changeColorAt);

    }

    CountNumberPage(totalPages){
        return new Array(totalPages);
    }
}
