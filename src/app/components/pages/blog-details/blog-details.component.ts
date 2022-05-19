import { Component, OnInit } from '@angular/core';

// Icons:
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWandMagic } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
    faStar = faStar;
    faLocationDot = faLocationDot;
    faWandMagic = faWandMagic;
    faPlus = faPlus;
    faMinus = faMinus;

  constructor() { }

  ngOnInit(): void {
  }

}
