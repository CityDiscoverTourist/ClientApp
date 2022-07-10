import { Component, OnInit } from '@angular/core';
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
    faVenus = faVenus;
    faMars = faMars;
    sessionLogin = null;
    customerData: Auth;
    gender = false;

  constructor(private behaviorObject: BehaviorsubjectService) { }

  ngOnInit(): void {
    this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
  }

}
