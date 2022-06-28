import { Component, OnInit } from "@angular/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { CustomerquestService } from "src/app/services/customerquest.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { CustomerQuest } from "src/app/models/customerQuest.model";
import { QuestService } from "src/app/services/quest.service";
import { QuestPage } from "src/app/models/questPage.model";
import { Quest } from "src/app/models/quest.model";
import { Router } from "@angular/router";
import { QuestType } from "src/app/models/questtype.model";
import { QuesttypeService } from "src/app/services/questtype.service";
import { NgToastService } from "ng-angular-popup";
import {
    FacebookLoginProvider,
    SocialAuthService,
} from "angularx-social-login";
import { LandingPage } from "src/app/models/landingPage.model";
import { FacebookService } from "src/app/services/facebook.service";
import { PaymentService } from "src/app/services/payment.service";
import { Payment } from "src/app/models/payment.model";
import { CustomerQuestPage } from "src/app/models/customerQuestPage.model";

@Component({
    selector: "app-purchase-page",
    templateUrl: "./purchase-page.component.html",
    styleUrls: ["./purchase-page.component.scss"],
})
export class PurchasePageComponent implements OnInit {
    faCheck = faCheck;
    faPlus = faPlus;
    faMinus = faMinus;

    public quantity: number = 1;
    public price: number = 0;
    public total: number = 0;
    public questID: string = "";
    public quest: Quest[] = [];
    public cart;
    // public today = new Date();
    public questTypeID: string = "";
    public questTypes: QuestType[] = [];
    public isLoginGoogle = false;
    public loginMsg: string = "";
    public beginPoint: string;
    public userFacebook;
    public isLoginFacebook = false;
    public customerQuestIDLatest : number = 0;

    public payment: Payment = {
        id: 0,
        paymentMethod: "",
        quantity: 0,
        amountTotal: 0,
        status: "",
        customerQuestId: 0,
    };

    public cq: CustomerQuest = {
        id: 0,
        beginPoint: "",
        endPoint: null,
        createdDate: null,
        rating: 0,
        feedBack: null,
        customerId: "",
        isFinished: false,
        questId: 0,
        status: "",
        paymentMethod: null,
    };

    constructor(
        private firebaseService: FirebaseService,
        private questService: QuestService,
        private questTypeService: QuesttypeService,
        private customerQuest: CustomerquestService,
        private ngToastService: NgToastService,
        private authService: SocialAuthService,
        private facebookService: FacebookService,
        private paymentService: PaymentService,

        private router: Router
    ) {}

    ngOnInit(): void {
        //SessionStorage
        this.cart = JSON.parse(sessionStorage.getItem("cart"));
        this.questID = sessionStorage.getItem("questInfo");
        this.questTypeID = sessionStorage.getItem("questTypeID");

        this.quantity = this.cart.quantity;
        // console.log('now', this.today.getDate()+'-'+(this.today.getMonth()+1)+'-'+this.today.getFullYear()+' '+this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds());
        console.log("newDate", new Date());

        // Get Quest
        this.questService
            .getQuests(this.questID)
            .subscribe((res: QuestPage) => {
                this.quest = res.data;
                console.log("this.quest", this.quest);
                this.price = this.quest["price"];
                this.total = this.quantity * this.price;
                this.beginPoint = String(this.quest["countQuestItem"] * 300);
                console.log("beginPoint", this.beginPoint);
            });

        // Get QuestType
        this.questTypeService
            .getQuestTypeByID(this.questTypeID)
            .subscribe((res) => {
                this.questTypes = res.data;
                console.log("this.questTypes1234", this.questTypes);
            });

        // login Facebook When click Login FB button
        this.authService.authState.subscribe((res) => {
            // Get authToken: res.authToken
            this.userFacebook = res;
            console.log("API login fb: ", res);
            // Get accountId
            this.facebookService
                .loginWithFacebook(this.userFacebook["authToken"])
                .subscribe((fb: any) => {
                    if (fb != null) {
                        console.log("accountId", fb.accountId);
                        // Get accountId
                        localStorage.setItem(
                            "CustomerData",
                            JSON.stringify(fb)
                        );
                        this.isLoginFacebook = true;
                        this.ngToastService.success({
                            detail: "Thông báo",
                            summary: "Login Facebook thành công",
                            duration: 5000,
                        });
                    }
                });

            console.log("cq", this.cq);
        });
    }

    public count_quantity(func: string) {
        if (func === "+") {
            this.quantity++;
            this.total = this.quantity * this.price;
        } else {
            if (this.quantity !== 1) {
                this.quantity--;
                this.total = this.quantity * this.price;
            }
        }
    }
    public keyUpTotal() {
        this.total = this.quantity;
        this.total = this.quantity * this.price;
    }

    public loginWithGoogle() {
        this.firebaseService.loginWithGoogle();
        this.isLoginGoogle = true;
    }

    public loginWithFacebook() {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    public postCustomerQuest() {
        if (this.isLoginGoogle || this.isLoginFacebook) {
            // Get CustomerID
            const customerData = JSON.parse(
                localStorage.getItem("CustomerData")
            );

            this.cq = {
                id: 0,
                beginPoint: this.beginPoint,
                endPoint: null,
                createdDate: new Date(),
                rating: 0,
                feedBack: null,
                customerId: customerData.accountId,
                isFinished: false,
                questId: Number(this.questID),
                status: "active",
                paymentMethod: null,
            };
            console.log("cq", this.cq);
            // create CustomerQuest
            this.customerQuest
                .createCustomerQuest(this.cq)
                .subscribe((res: CustomerQuestPage) => {
                    this.customerQuestIDLatest = (!!res && !!res.data) ? res.data["id"] : undefined; ;
                    console.log("POST CustomerQuest xong");
                    console.log('res: CustomerQuest', res);
                    console.log('customerQuestIDLatest',this.customerQuestIDLatest);


                });
            // create Payment
            this.payment = {
                id: 0,
                paymentMethod: "momo",
                quantity: this.quantity,
                amountTotal: this.total,
                status: "purchased",
                customerQuestId: customerData.accountId,
            };
            this.paymentService.createPayment(this.payment).subscribe((res:Payment) =>{
                console.log("payment xong");
            })
        } else {
            // this.loginMsg = "Vui lòng Login để tiếp tục";
            // window.alert(this.loginMsg);
            this.ngToastService.error({
                detail: "Thông báo",
                summary: "Vui lòng Login để tiếp tục",
                duration: 5000,
            });
        }
    }

    // Navigator
    goListQuests() {
        sessionStorage.setItem("questTypeID", this.questTypeID);
        this.router.navigate(["quest"]);
    }
}
