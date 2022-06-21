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
    //    var a= this.questService.data$;
    //    console.log("jjdjd")
    //     console.log(a)
        // this.questService.data$.subscribe((data)=>{

        //     console.log("param: "+data);

        // })

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
            console.log('this.quest',this.quests);
            if(!!res && !!res.pagination){
                this.totalCount = res.pagination.totalCount;
                this.totalPages = res.pagination.totalPages;
                this.pageSize = res.pagination.pageSize;
                this.currentPage = res.pagination.currentPage;
                this.hasNext = res.pagination.hasNext;
                this.hasPrevious = res.pagination.hasPrevious;
            }
            console.log('totalCount: '+this.totalCount+' ,totalPages: '+this.totalPages+' ,pageSize: '+
            this.pageSize+' ,currentPage: '+ this.currentPage+' ,hasNext: '+this.hasNext+' ,hasPrevious: '+this.hasPrevious);

        })

        // console.log('b', this.questService.data$);

        // this.questService.data$.subscribe((res:QuestPage) =>{
        //     // this.quests = res.data;
        //     console.log('param', res);

        // })
        // this.quests = this.questPage.data;
        // this.questService.data$.subscribe((data)=>{
        //     console.log("aaa");

        //     console.log(data);

        // })
        // .subscribe((res:QuestPage) =>{
        //     this.quests = res.data;
        //     // console.log('quests', this.quests);

        //     this.totalCount = res.pagination.totalCount;
        //     this.totalPages = res.pagination.totalPages;
        //     this.pageSize = res.pagination.pageSize;
        //     this.currentPage = res.pagination.currentPage;
        //     this.hasNext = res.pagination.hasNext;
        //     this.hasPrevious = res.pagination.hasPrevious;

        //     console.log('totalCount: '+this.totalCount+' ,totalPages: '+this.totalPages+' ,pageSize: '+
        //     this.pageSize+' ,currentPage: '+ this.currentPage+' ,hasNext: '+this.hasNext+' ,hasPrevious: '+this.hasPrevious);

        // });
        // this.questService.getQuestsByType(this.questTypeID, currentPage).subscribe((res:QuestPage) =>{
        //     this.quests = res.data;
        //     // console.log('quests', this.quests);

        //     this.totalCount = res.pagination.totalCount;
        //     this.totalPages = res.pagination.totalPages;
        //     this.pageSize = res.pagination.pageSize;
        //     this.currentPage = res.pagination.currentPage;
        //     this.hasNext = res.pagination.hasNext;
        //     this.hasPrevious = res.pagination.hasPrevious;

        //     console.log('totalCount: '+this.totalCount+' ,totalPages: '+this.totalPages+' ,pageSize: '+
        //     this.pageSize+' ,currentPage: '+ this.currentPage+' ,hasNext: '+this.hasNext+' ,hasPrevious: '+this.hasPrevious);

        // });

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
            console.log('this.quests123 ',this.quests);

        })

        console.log('currentPage: ', this.currentPageCommon);
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
        console.log('currentPage: ', this.currentPageCommon);
        // this.questService.getQuestsByType(this.questTypeID, String(this.currentPageCommon)).subscribe(res =>{
        //     this.quests = res.data;
        // })

    }

    countNumberPage(totalPages){
        return new Array(totalPages);
    }
}
