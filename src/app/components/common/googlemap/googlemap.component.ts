import { style } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { Loader } from "@googlemaps/js-api-loader";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-googlemap",
    templateUrl: "./googlemap.component.html",
    styleUrls: ["./googlemap.component.scss"],
})
export class GooglemapComponent implements OnInit {
    constructor(private translateService: TranslateService) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }
    private map: google.maps.Map;
    ngOnInit(): void {
        let loader = new Loader({
            // apiKey: "AIzaSyBAMi2k1f5J3R1_HTET7FlBYKx44wRlV-U",
            apiKey: "AIzaSyCJ_xAkp6ULrF29-zSxBi4LUV57OKmdVsI",
        });

        loader.load().then(() => {
            console.log("loaded map");

            const location = {
                lat: 10.335534565238572,
                lng: 103.85701004968347,
            };

            this.map = new google.maps.Map(
                document.getElementById("map") as HTMLElement,
                {
                    center: location,
                    zoom: 22,
                }
            );

            // // Marker
            // const marker = new google.maps.Marker({
            //     position: location,
            //     map: this.map,
            //     title: `Vinpearl nè`,
            //     label:`tra vồ`,
            //     optimized: false,
            // });

            // // Create an info window to share between markers.
            // const infoWindow = new google.maps.InfoWindow();
            // // Add a click listener for each marker, and set up the info window.
            // marker.addListener("click", () => {
            //     infoWindow.close();
            //     infoWindow.setContent(marker.getTitle());
            //     infoWindow.open(marker.getMap(), marker);
            // });
        });
    }

    title = "google-maps";
}
