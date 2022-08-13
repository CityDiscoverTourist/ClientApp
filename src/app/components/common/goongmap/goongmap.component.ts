import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { Quest } from "src/app/models/quest.model";
import { QuestService } from "src/app/services/quest.service";
import * as goongjs from "src/assets/goongmap/goong-js";
import * as GoongGeocoder from "src/assets/goongmap/goonggeo";
@Component({
    selector: "app-goongmap",
    templateUrl: "./goongmap.component.html",
    styleUrls: ["./goongmap.component.scss"],
})
export class GoongmapComponent implements OnInit{
    constructor(private questService : QuestService) {}

    geoCoder: any;
    map: any;
    questID : string = '';
    quest:Quest[] = [];
    longlat : number [];

    ngOnInit(): void {
        // goongjs.accessToken = "KbnM9UKMXXWwyZ0IfxDgDHMxGCxOdZWVOYtc9q4g";
        goongjs.accessToken = "0VhkuiKGAp71oodWmsZ6ngNZA1EG07pUWxozTzby";
        this.questID = sessionStorage.getItem("questInfo");
        this.questService.getQuests(this.questID).subscribe(res =>{
        this.quest = res.data;
        const textPopup = this.quest['address'];
        let popup = new goongjs.Popup({ offset: 25 }).setText(textPopup);

        // Get latlong
        const latlongStr : string = this.quest['latLong'];
        // server return latlong => convert longlat

        if(latlongStr != null ){
            this.longlat = latlongStr.split(',').map(Number).reverse();

            const map = new goongjs.Map({
                container: "map",
                style: "https://tiles.goong.io/assets/goong_map_web.json", // stylesheet location
                center: this.longlat, // starting position [lat, lng]
                zoom: 9, // starting zoom
            });
            const marker = new goongjs.Marker()
                .setLngLat(this.longlat) // position add marker [lat, lng]
                .setPopup(popup)
                .addTo(map);
        }else{
            this.longlat = null;
        }
        });

    }


}
