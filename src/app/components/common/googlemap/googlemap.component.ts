import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.scss']
})
export class GooglemapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

      let loader = new Loader({
          apiKey:'AIzaSyAJsDtjtpV_f-pHj78C1ZSDOU5KywKZyvI'
      });

      loader.load().then(() =>{
          console.log("loaded map");

          const location = {
              lat: 10.335477,
              lng: 103.857026
          }

          this.map = new google.maps.Map(document.getElementById('map'),{
              center:location,
              zoom: 16,
          })

          // Marker
          const marker = new google.maps.Marker({
              position:location,
              map:this.map
          })
      })
  }

  title = "google-maps";
  private map: google.maps.Map

}
