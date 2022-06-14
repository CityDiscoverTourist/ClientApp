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
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
// import { CityPage } from "src/app/models/CityPage.model";
import { CityPage } from "src/app/models";
import { Customer } from "src/app/models/customer.model";
import { CustomerQuest } from "src/app/models/customerQuest.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { QuestType } from "src/app/models/questtype.model";
import { CityService } from "src/app/services/city.service";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerquestService } from "src/app/services/customerquest.service";
import { QuestService } from "src/app/services/quest.service";
import { QuesttypeService } from "src/app/services/questtype.service";

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
    public customerQuests: CustomerQuest[] = [];

    public rating: number[] = [];
    public totalRating: number = 0;
    public customerID: string = '';
    public customers: Customer[] = [];

    constructor(
        private questService: QuestService,
        private cityService: CityService,
        private customerQuestService: CustomerquestService,
        private customerService: CustomerService,
        private questTypeService:QuesttypeService,
        private router: Router,
    ) {}

    ngOnInit(): void {
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
                });
        });

        this.customerQuestService.getCustomerQuestByQuestID(
            this.questID
        ).subscribe((res) => {
            res.data.forEach((x) => {
                if (x.feedBack != null) {
                    this.customerQuests = res.data;
                    this.totalRating = this.customerQuests.length;


                    // Get Num of Rating
                    if (x.rating >= 5) {
                        x.rating = 5;
                        this.rating.length = x.rating;
                        // console.log("rating", this.rating);
                    }
                }
            });
            console.log("Customer Quest", this.customerQuests);

            // Get All Customer
            this.customerService.getCustomers("").subscribe(res =>{
                this.customers = res.data;
                console.log('this.customers', this.customers);

            })
        });

        // Get QuestType
        this.questTypeService.getQuestTypes(this.questTypeID).subscribe(res =>{
                this.questTypes = res.data;
                console.log('this.questTypes', this.questTypes);

        })


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
    }
    public keyUpTotal() {
        this.total = this.quantity;
        this.total = this.quantity * this.price;
    }

    // Navigator
    goListQuests(){
        sessionStorage.setItem("questTypeID", this.questTypeID);
        this.router.navigate(["quest"]);
    }

    goPurchasePage(){
        this.router.navigate(["purchase-page"]);
    }
}
