import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { CustomerService } from "src/app/services/customer.service";
import { Customer, CustomerUpdating } from "src/app/models/customer.model";
import { CustomerPage } from "src/app/models/customerPage.model";
import { NgToastService } from "ng-angular-popup";

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
    customer: Customer;
    customerUpdating: CustomerUpdating = {
        id: "",
        userName: "",
        email: "",
        address: "",
        gender: null,
        imagePath: "",
    };
    aaa = true;
    // ngClass
    cssAutoFocusMale = `
        .male-icon{
            color: deepskyblue;
        }
    `;
    cssAutoFocusFemale = `
        .female-icon{
            color: pink;
        }
    `;
    constructor(
        private customerService: CustomerService,
        private ngToastService: NgToastService
    ) {}

    ngOnInit(): void {
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));

        this.customerService
            .getCustomerProfile(this.customerData.accountId)
            .subscribe((res: Customer) => {
                this.customer = !!res ? res : undefined;
                this.customerUpdating = {
                    id: this.customer.id,
                    userName: this.customer.userName,
                    email: this.customer.email,
                    address: this.customer.address,
                    gender: this.customer.gender,
                    imagePath: this.customer.imagePath,
                };
            });
    }

    changeGender(gender: string) {
        if (gender == "male") {
            this.customerUpdating.gender = true;
        } else if ((gender = "female")) {
            this.customerUpdating.gender = false;
        }
        console.log("gender", this.customerUpdating.gender);
    }

    updateProfile() {
        this.customerService
            .updateCustomer(this.customerUpdating)
            .subscribe((res) => {
                console.log(
                    "Updated customer sucessfully",
                    this.customerUpdating
                );
                this.ngToastService.success({
                    detail: "Thông báo",
                    summary: "Cập nhật thành công!",
                    duration: 3000,
                });
            });
    }
}
