import { Component, OnInit } from "@angular/core";
import { circle, Map, marker, popup, tileLayer } from "leaflet";

@Component({
    selector: "app-leaflet",
    templateUrl: "./leaflet.component.html",
    styleUrls: ["./leaflet.component.scss"],
})
export class LeafletComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
    lat = 10.3371308;
    long = 103.8914803;
    ngAfterViewInit(): void {
        const apikey =
            "pk.eyJ1IjoiY3VxMzA0IiwiYSI6ImNsM2oyN2E0azEwMHEzY2xqbzF4bTAxM2QifQ.JuO6PN9_VuMOjSmXeYIHTw";
        const mapbox_url =
            "https://api.mapbox.com/styles/v1/cuq304/cl3j2a4gc000t14p36rp86ki2/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3VxMzA0IiwiYSI6ImNsM2oyN2E0azEwMHEzY2xqbzF4bTAxM2QifQ.JuO6PN9_VuMOjSmXeYIHTw";

        const map = new Map("map").setView([this.lat, this.long], 20);
        // tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        tileLayer(mapbox_url, {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 17,
            tileSize: 512,
            zoomOffset: -1,
        }).addTo(map);

        // tileLayer(
        //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        //     {
        //         attribution:
        //             'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        //         maxZoom: 17,
        //         id: "mapbox/streets-v11",
        //         tileSize: 512,
        //         zoomOffset: -1,
        //         accessToken: apikey,
        //     }
        // ).addTo(map);

        // marker
        const locationName = "Vinpearl Safari Phú Quốc";
        const contentPopup = "<b>" + locationName + "</b>";
        const markerItem = marker([this.lat, this.long])
            .addTo(map)
            .bindPopup(contentPopup)
            .openPopup();
        map.fitBounds([
            [markerItem.getLatLng().lat, markerItem.getLatLng().lng],
        ]);

        // Circle
        const circleItem = circle([this.lat, this.long], {
            color: "rgb(255, 98, 0)",
            fillColor: "rgb(255, 98, 0)",
            fillOpacity: 0.5,
            radius: 100,
        }).addTo(map);

        // function1
        // function onMapClick(e) {
        //     alert("You clicked the map at " + e.latlng);
        // }
        // map.on('click', onMapClick);

        // function2
        // const popupItem = popup();
        // function onMapClick(e) {
        //     popupItem
        //         .setLatLng(e.latlng)
        //         .setContent("Kinh độ & Vĩ độ " + e.latlng.toString())
        //         .openOn(map);
        // }
        // map.on("click", onMapClick);
    }
}
