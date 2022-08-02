import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Icons:
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWandMagic } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";

// Models:
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
// import { CityPage } from "src/app/models/CityPage.model";
import { CityPage } from "src/app/models";
import { Customer } from "src/app/models/customer.model";
import { CustomerComment, CustomerQuest } from "src/app/models/customerQuest.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { QuestType } from "src/app/models/questtype.model";

// Services:
import { CityService } from "src/app/services/city.service";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerquestService } from "src/app/services/customerquest.service";
import { QuestService } from "src/app/services/quest.service";
import { QuesttypeService } from "src/app/services/questtype.service";
import { LandingPage } from "src/app/models/landingPage.model";

// Toast
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: "app-blog-details",
    templateUrl: "./blog-details.component.html",
    styleUrls: ["./blog-details.component.scss"],
})
export class BlogDetailsComponent implements OnInit {
    faStar = faStar;
    faLocationDot = faLocationDot;
    faWandMagic = faWandMagic;
    faPlus = faPlus;
    faMinus = faMinus;
    faClipboardList = faClipboardList;
    faRoad = faRoad;
    faTag = faTag;
    faClock = faClock;
    faCheck = faCheck;
    faAward = faAward;
    faHourglassStart = faHourglassStart;

    public quest: Quest[] = new Array();
    public quantity: number = 1;
    public price: number = 0;
    public total: number = 0;
    public cities: City[] = [];
    public areas: Area[] = new Array();
    public filterCity;
    public questTypeID: string = "";
    public questTypes: QuestType[] = [];

    public countQuestItem: number = 0;
    public questID: string = "";
    public beginningPoint: number = 0;
    public customerID: string = '';
    public customerQuestComment : CustomerComment[] = [];
    public isReadAll = false;
    public language = "";

    constructor(
        private questService: QuestService,
        private cityService: CityService,
        private customerQuestService: CustomerquestService,
        private questTypeService:QuesttypeService,
        private router: Router,
        private ngToastService: NgToastService,

    ) {}

    ngOnInit(): void {
        // Get Language
        this.language = localStorage.getItem('lang');

        this.questID = sessionStorage.getItem("questInfo");
        this.questTypeID = sessionStorage.getItem("questTypeID");

        // Get all City, Area
        this.cityService.getCities().subscribe((res: CityPage) => {
            this.cities = res.data;
            // console.log("city", this.cities);

            res.data.forEach((x) => {
                if (x.areas[0] != null) {
                    x.areas.forEach((resArea) => {
                        this.areas.push(resArea);
                    });
                }
            });
            // console.log("area", this.areas);

            // Get result Quest, City
            this.questService
                .getQuests(this.questID)
                .subscribe((res: QuestPage) => {
                    this.quest = res.data;

                    console.log("quest", this.quest);

                    // Get City by AreaID
                    this.cities.forEach((resCity) => {
                        // console.log("resCity", resCity);
                        this.areas.forEach((resArea) => {
                            if (
                                this.quest["areaId"] == resArea.id &&
                                resArea.cityId == resCity.id
                            ) {
                                this.filterCity = resCity.name;
                            }
                        });
                    });

                    // console.log("this.filterCity", this.filterCity);
                    this.price = this.quest["price"];
                    this.total = this.price;

                    // Caculate beginning point
                    this.beginningPoint = this.quest["countQuestItem"] * 300;
                });
        });

        // Get QuestType
        this.questTypeService.getQuestTypeByID(this.questTypeID).subscribe(res =>{
                this.questTypes = res.data;
                console.log('this.questTypes', this.questTypes);
        })

        this.getCustomerComment();
    }

    getCustomerComment(){
        this.customerQuestService.getCustomerCommentByQuestID(Number(this.questID), 5)
        .subscribe((res: CustomerComment[]) =>{
            this.customerQuestComment = res;
            console.log(' this.customerQuestComment', this.customerQuestComment);
        });
    }
    readAll(){
        const pageSize = 999;
        this.customerQuestService.getCustomerCommentByQuestID(Number(this.questID), pageSize)
        .subscribe((res: CustomerComment[]) =>{
            this.customerQuestComment = res;
            console.log(' this.customerQuestComment', this.customerQuestComment);
        })
        this.isReadAll = true;
    }
    public count_quantity(func: string) {
        if (func === "+") {
            this.quantity++;
            this.total = this.quantity * this.price;
        } else {
            if (this.quantity !== 1) {
                this.quantity--;
                this.total = this.quantity * this.price;
            }
        }
        // Validation
        if(this.quantity <= 0){
            if(this.language == "0"){
                this.ngToastService.error({
                    detail: "Message",
                    summary: "Quest Quantity must be greater than 0",
                    duration: 3000,
                });
            }else{
                this.ngToastService.error({
                    detail: "Thông báo",
                    summary: "Số Lượng Quest phải lớn hơn 0",
                    duration: 3000,
                });
            }

        }else if(this.quantity >= 99){
            if(this.language == "0"){
                this.ngToastService.error({
                    detail: "Message",
                    summary: "Quest Quantity max is 99",
                    duration: 3000,
                });
            }else{
                this.ngToastService.error({
                    detail: "Thông báo",
                    summary: "Số Lượng Quest tối đa là 99",
                    duration: 3000,
                });
            }
        }
    }

    public keyUpTotal() {
        this.total = this.quantity;
        this.total = this.quantity * this.price;
        // Validation
        if(this.quantity <= 0){
            if(this.language == "0"){
                this.ngToastService.error({
                    detail: "Message",
                    summary: "Quest Quantity must be greater than 0",
                    duration: 3000,
                });
            }else{
                this.ngToastService.error({
                    detail: "Thông báo",
                    summary: "Số Lượng Quest phải lớn hơn 0",
                    duration: 3000,
                });
            }
        }else if(this.quantity >= 99){
            if(this.language == "0"){
                this.ngToastService.error({
                    detail: "Message",
                    summary: "Quest Quantity max is 99",
                    duration: 3000,
                });
            }else{
                this.ngToastService.error({
                    detail: "Thông báo",
                    summary: "Số Lượng Quest tối đa là 99",
                    duration: 3000,
                });
            }
        }
    }


    // Navigator
    goListQuests(){
        sessionStorage.setItem("questTypeID", this.questTypeID);
        this.router.navigate(["quest"]);
    }

    goPurchasePage(){
        let cart :{
            "questId" : string,
            "quantity": number
        } = {
            "questId" : this.quest["areaId"],
            "quantity": this.quantity
        };
        sessionStorage.setItem("questInfo", this.questID)
        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("questTypeID", this.questTypeID);
        this.router.navigate(["purchase-page"]);
    }
}
