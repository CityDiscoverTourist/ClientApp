import { Component, OnInit } from "@angular/core";

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
import { TranslateService } from "@ngx-translate/core";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { CityPage } from "src/app/models/CityPage.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { CityService } from "src/app/services/city.service";
import { QuestService } from "src/app/services/quest.service";

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

    constructor(
        private questService: QuestService,
        private cityService: CityService
    ) {}

    ngOnInit(): void {
        const questInfo = localStorage.getItem("questInfo");
        this.questService.getQuests(questInfo).subscribe((res: QuestPage) => {
            this.quest = res.data;

            // Get City by AreaID
            this.areas.forEach((resArea) => {
                this.cities.forEach((resCity) => {
                    if (
                        this.quest["areaId"] == resArea.id &&
                        resArea.cityId == resCity.id
                    ) {
                        this.filterCity =  resCity.name;
                        console.log('this.filterCity', this.filterCity);

                    }
                    // })
                });
            });
            // console.log("this.quest", this.quest["areaId"]);

            this.price = this.quest["price"];
            this.total = this.price;
        });
        // console.log("abc", this.quest);
        // Get all City and Area
        this.cityService.getCities().subscribe((res: CityPage) => {
            this.cities = res.data;
            console.log("city", res.data);

            res.data.forEach((x) => {
                if (x.areas[0] != null) {
                    // console.log('area', x.areas);

                    x.areas.forEach((resArea) => {
                        this.areas.push(resArea);
                    });
                }
            });
            console.log("final area", this.areas);
        });
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
}
