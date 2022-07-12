import { Component, OnInit } from "@angular/core";
// import { MatDialog } from '@angular/material/dialog';
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { NgToastService } from "ng-angular-popup";
import { Contact } from "src/app/models/contact.model";
import { UserSubscribedService } from "src/app/services/user-subscribed.service";
import { NavLoginComponent } from "src/app/shared/modals/nav-login/nav-login.component";
@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
    faFacebookF = faFacebookF;
    faTwitter = faTwitter;
    faLinkedinIn = faLinkedinIn;
    faInstagram = faInstagram;

    public contact: Contact = {
        id: 0,
        email: "",
        name: "",
        phoneNumber: "",
    };

    constructor(
        private userSubscribed: UserSubscribedService,
        private ngToastService: NgToastService
    ) {}

    ngOnInit(): void {}
    createContact() {
        if (
            this.contact.name != null &&
            this.contact.phoneNumber != null &&
            this.contact.email != null
        ) {
            this.userSubscribed
                .createContact(this.contact)
                .subscribe((res: Contact) => {
                    console.log("Contact", this.contact);

                    console.log("create contact successful", res);
                    this.ngToastService.success({
                        detail: "Thông báo",
                        summary: "Gửi thông tin liên hệ thành công",
                        duration: 5000,
                    });
                });
        }
    }
}
