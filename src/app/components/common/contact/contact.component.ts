import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { NavLoginComponent } from 'src/app/shared/modals/nav-login/nav-login.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    faFacebookF = faFacebookF;
    faTwitter = faTwitter;
    faLinkedinIn = faLinkedinIn;
    faInstagram = faInstagram;
    constructor() {}
    // constructor(public dialogRef: MatDialog) {}

  ngOnInit(): void {
  }

}
