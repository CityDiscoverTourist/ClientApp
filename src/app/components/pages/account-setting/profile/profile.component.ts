import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { CustomerService } from "src/app/services/customer.service";
import { Customer, CustomerUpdating } from "src/app/models/customer.model";
import { CustomerPage } from "src/app/models/customerPage.model";
import { NgToastService } from "ng-angular-popup";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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
    newFile:File;
    customerUpdating: CustomerUpdating = {
        id: "",
        userName: "",
        email: "",
        address: "",
        gender: null,
        imagePath: "",
        fullName: "",
    };
    public langfixed;
    // public updatingForm: FormGroup;


    constructor(
        private customerService: CustomerService,
        private ngToastService: NgToastService,
        private translateService: TranslateService,
        private myBehaviorSubject: BehaviorsubjectService,
    ) {}

    ngOnInit(): void {
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));

        this.customerService
            .getCustomerProfile(this.customerData.accountId)
            .subscribe((res: Customer) => {

                this.customer = !!res ? res : undefined;
                console.log('this.customer',this.customer);

                this.customerUpdating = {
                    id: this.customer.id,
                    userName: null,
                    email: this.customer.email,
                    address: this.customer.address,
                    gender: this.customer.gender,
                    imagePath: this.customer.imagePath,
                    fullName: this.customer.fullName
                };
                // get avatar
                this.myBehaviorSubject.avatar$.subscribe(res =>{
                    this.customerUpdating.imagePath = res;

                })
            });
        this.getI18n();
    }

    getI18n(){
        this.langfixed = localStorage.getItem("fixedlang") || "vi-VN";
        if (this.langfixed != null) {
            this.translateService.use(this.langfixed);
        }
    }

    changeGender(gender: string) {
        if (gender == "male") {
            this.customerUpdating.gender = true;
        } else if ((gender = "female")) {
            this.customerUpdating.gender = false;
        }
    }

    updateProfile() {
        this.customerService
            .updateCustomer(this.customerUpdating, this.newFile)
            .subscribe((res) => {
                // Reset
                window.location.reload();

                this.ngToastService.success({
                    detail: "Thông báo",
                    summary: "Cập nhật thành công!",
                    duration: 3000,
                });

        });
    }


    isPickAvatar = false;
    openImageModal(){
        if(this.isPickAvatar) this.isPickAvatar = false;
        else this.isPickAvatar = true;

    }
    removeOpenImage(){
        this.isPickAvatar = false;
    }
    pickAvatar(event){
        this.newFile=event.target.files[0];

    }
}
