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
import { LinkMomo, Payment, PaymentPage } from "src/app/models/payment.model";
import { CustomerQuestPage } from "src/app/models/customerQuestPage.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BillComponent } from "src/app/shared/modals/bill/bill.component";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";

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
    public customerQuestIDLatest: number = 0;
    public sessionLogin = null;

    public payment: Payment ;

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
        private router: Router,
        private modalService: NgbModal,
        private behaviorSubject: BehaviorsubjectService

    ) {}

    ngOnInit(): void {
        //SessionStorage
        // this.sessionLogin = sessionStorage.getItem('SessionLogin');
        this.cart = JSON.parse(sessionStorage.getItem("cart"));
        this.questID = sessionStorage.getItem("questInfo");
        this.questTypeID = sessionStorage.getItem("questTypeID");
        // Is Login yet ?
        this.behaviorSubject.isLogin$.subscribe((res) => {
            this.sessionLogin = res;
        });
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
                        sessionStorage.setItem("SessionLogin", "yes");
                        this.sessionLogin = sessionStorage.getItem("SessionLogin");
                        this.behaviorSubject.getIsLogin(this.sessionLogin);
                        this.isLoginFacebook = true;
                        this.ngToastService.success({
                            detail: "Thông báo",
                            summary: "Login Facebook thành công",
                            duration: 3000,
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

        let sessionLogin = sessionStorage.getItem("SessionLogin");
        if (sessionLogin != null) {
            this.behaviorSubject.getQuantity(this.quantity);
            console.log("sessionLogin in purchase page", sessionLogin);
            const modalRef = this.modalService.open(BillComponent, {
                centered: true,
                windowClass: "my-class"
            });
        } else {
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
