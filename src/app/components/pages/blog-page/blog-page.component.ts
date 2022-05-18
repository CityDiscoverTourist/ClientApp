import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;

  constructor() { }

  ngOnInit(): void {
  }

}
