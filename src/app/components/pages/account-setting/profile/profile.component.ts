import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerUpdating } from "src/app/models/customer.model";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    faVenus = faVenus;
    faMars = faMars;
    sessionLogin = null;
    customerData: Auth;

    customerUpdating : CustomerUpdating;

    constructor(private customerService: CustomerService) {}

    ngOnInit(): void {
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
        this.customerUpdating = {
            id : this.customerData.accountId,
            userName : this.customerData.fullName,
            email: this.customerData.email,
            address: "",
            gender: null,
            imagePath: this.customerData.imagePath,
        }
    }

    changeGender(gender:string){
        if(gender == "male"){
            this.customerUpdating.gender = true;
        }else if(gender = "female"){
            this.customerUpdating.gender = false;
        }
    }

    updateProfile(){
        this.customerService.updateCustomer(this.customerUpdating).subscribe(res =>{
            console.log("Updated customer", this.customerUpdating);
        })
    }
}
