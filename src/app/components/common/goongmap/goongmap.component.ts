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
export class GoongmapComponent implements OnInit, AfterViewChecked {
    constructor(private questService : QuestService) {}

    geoCoder: any;
    map: any;
    questID : string = '';
    quest:Quest[] = [];
    ngAfterViewChecked() {
        // console.log('this.geoCoder', this.geoCoder);
        // console.log('this.map', this.map);
        // //get latlong
        // console.log(this.geoCoder?._map?._easeOptions?.center);

        // //get place id
        // console.log(this.geoCoder?._typeahead?.selected?.place_id);
      }

    ngOnInit(): void {
        this.questID = localStorage.getItem("questInfo");
        this.questService.getQuests(this.questID).subscribe(res =>{
        this.quest = res.data;
        const textPopup = this.quest['address'];
        console.log('abc', textPopup);
        let popup = new goongjs.Popup({ offset: 25 }).setText(textPopup);

        const marker = new goongjs.Marker()
            .setLngLat(longlat) // position add marker [lng, lat]
            .setPopup(popup)
            .addTo(map);
        })
        const longlat = [105.85258524102564, 21.0287601];
        goongjs.accessToken = "KbnM9UKMXXWwyZ0IfxDgDHMxGCxOdZWVOYtc9q4g";

        const map = new goongjs.Map({
            container: "map",
            style: "https://tiles.goong.io/assets/goong_map_web.json", // stylesheet location
            center: longlat, // starting position [lng, lat]
            zoom: 9, // starting zoom
        });




        // goongjs.accessToken = "KbnM9UKMXXWwyZ0IfxDgDHMxGCxOdZWVOYtc9q4g";
        // this.map = new goongjs.Map({
        //     container: "map",
        //     style: "https://tiles.goong.io/assets/goong_map_web.json", // stylesheet location
        //     center: [106.81028, 10.84086], // starting position [lng, lat]
        //     zoom: 7,
        // });
        // var marker = new goongjs.Marker()
        //     .setLngLat([106.81028, 10.84086]) // position add marker [lng, lat]
        //     .addTo(this.map);

        // var zoom = new goongjs.NavigationControl({
        //     showCompass: true,
        // });

        // var getLocal = new goongjs.GeolocateControl({
        //     positionOptions: {
        //         enableHighAccuracy: true,
        //         timeout: 6000,
        //     },
        //     trackUserLocation: false,
        //     showUserLocation: true,
        // });

        // this.map.addControl(getLocal, "bottom-right");
        // this.map.addControl(zoom, "bottom-right");

        // this.geoCoder = new GoongGeocoder({
        //     accessToken: "KbnM9UKMXXWwyZ0IfxDgDHMxGCxOdZWVOYtc9q4g",
        //     goongjs: goongjs,
        // });

        // // Add the control to the map.
        // this.map.addControl(this.geoCoder);
    }


}
