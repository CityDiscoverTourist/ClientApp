import { Component, OnInit } from "@angular/core";
import { CustomerPasswordUpdating } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import { Auth } from "src/app/models/auth.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: "app-password-changing",
    templateUrl: "./password-changing.component.html",
    styleUrls: ["./password-changing.component.scss"],
})
export class PasswordChangingComponent implements OnInit {
    public passwordUpdating: CustomerPasswordUpdating = {
        customerId: "",
        oldPassword: "",
        newPassword: "",
    };
    public customerData: Auth;

    constructor(
        private customerService: CustomerService,
        public fb: FormBuilder,
        private ngToastService: NgToastService,

    ) {
    this.createFormPasswordChanging();

    }

    ngOnInit(): void {
        this.msg_PasswordRecentWrong = "";
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
        if (this.customerData != null) {
            this.passwordUpdating.customerId = this.customerData.accountId;
            console.log("this.passwordUpdating", this.passwordUpdating);
        }
    }

    // Validation
    formPasswordChanging!: FormGroup;
    public createFormPasswordChanging() {
        const passwordPattern = "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\\W).*$";

        this.formPasswordChanging = this.fb.group({
            oldPassword: ["", [Validators.required,Validators.minLength(8),Validators.pattern(passwordPattern)]],
            newPassword: ["",[Validators.required,Validators.minLength(8),Validators.pattern(passwordPattern)]],
            confirmNewPassword: ["",[Validators.required,Validators.minLength(8),Validators.pattern(passwordPattern)]],
        });
    }
    get oldPassword(){
        return this.formPasswordChanging.get('oldPassword');
    }
    get netPassword(){
        return this.formPasswordChanging.get('newPassword');
    }

    msg_PasswordRecentWrong = "";
    changePassword() {
        this.passwordUpdating = {
            customerId: this.customerData != null ? this.customerData.accountId : '',
            oldPassword: this.oldPassword.value,
            newPassword: this.netPassword.value,
        }
        console.log('this.passwordUpdating',this.passwordUpdating);

        this.customerService
            .updateCustomerPassword(this.passwordUpdating)
            .subscribe({
                next: (res) => {
                    console.log('Change password successfully', res);
                    this.ngToastService.success({
                        detail: "Thông báo",
                        summary: "Đổi Mật Khẩu thành công",
                        duration: 3000,
                    });
                    this.msg_PasswordRecentWrong = "";
                },
                error: (Error) => {
                    console.log('error', Error.statusText);
                    if(Error.statusText == 'Bad Request') this.msg_PasswordRecentWrong = "Mật Khẩu hiện tại không đúng hoặc";

                },
            });
    }
}
