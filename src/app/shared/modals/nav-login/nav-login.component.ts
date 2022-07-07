import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from "@angular/core";
import {
    faFacebookSquare,
    faGooglePlusSquare,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
    FacebookLoginProvider,
    SocialAuthService,
} from "angularx-social-login";
import { NgToastService } from "ng-angular-popup";
import { async } from "rxjs/internal/scheduler/async";
import { Auth } from "src/app/models/auth.model";
import { CustomerPage } from "src/app/models/customerPage.model";
import { CustomerQuest } from "src/app/models/customerQuest.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { FacebookService } from "src/app/services/facebook.service";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
    selector: "app-nav-login",
    templateUrl: "./nav-login.component.html",
    styleUrls: ["./nav-login.component.scss"],
})
export class NavLoginComponent implements OnInit {
    faFacebookSquare = faFacebookSquare;
    faGooglePlusSquare = faGooglePlusSquare;
    faGoogle = faGoogle;
    isActive = false;
    public userFacebook;
    public sessionLogin = null;

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
        private authService: SocialAuthService,
        private facebookService: FacebookService, // my service
        private ngToastService: NgToastService,
        public activeModal: NgbActiveModal,
        private behaviorObject : BehaviorsubjectService
    ) {}


    ngOnInit(): void {
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
                        this.behaviorObject.getIsLogin(this.sessionLogin);
                        this.ngToastService.success({
                            detail: "Thông báo",
                            summary: "Login Facebook thành công",
                            duration: 5000,
                        });
                    }
                });
        });
    }

    goRegisterTab() {
        // var add = event.target?.classList.remove('active');
        // var remove = event.target?.classList.add('active');
        // console.log('add: '+add+' remove: '+remove);
        this.isActive = true;
    }

    goLoginTab() {
        this.isActive = false;
    }

    async loginWithGoogle() {
        await this.firebaseService.loginWithGoogle().then((res) =>{
                this.activeModal.close();
        });
    }

    public loginWithFacebook() {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
}
