import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck,
    OnInit,
} from "@angular/core";
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
import { AccountRegistration, Auth, UserLogin } from "src/app/models/auth.model";
import { CustomerPage } from "src/app/models/customerPage.model";
import { CustomerQuest } from "src/app/models/customerQuest.model";
import { AuthService } from "src/app/services/auth.service";
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
    nextModal = "login";

    public userFacebook;
    public sessionLogin = null;
    public msg = "";
    userLogin : UserLogin = {
        email: "",
        password: "",
    };

    userRegister : AccountRegistration = {
        email: "",
        password: "",
    };
    public comfirmPassword: "";

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
        private authenService: SocialAuthService,
        private facebookService: FacebookService, // my service
        private ngToastService: NgToastService,
        public activeModal: NgbActiveModal,
        private behaviorObject: BehaviorsubjectService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        // login Facebook When click Login FB button
        this.authenService.authState.subscribe((res) => {
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
                        this.saveAndCloseModal();
                    }
                });
        });
    }

    saveAndCloseModal(){
        sessionStorage.setItem("SessionLogin", "yes");
        this.sessionLogin =
            sessionStorage.getItem("SessionLogin");
        this.behaviorObject.getIsLogin(this.sessionLogin);
        this.activeModal.close();
        this.ngToastService.success({
            detail: "Thông báo",
            summary: "Login Facebook thành công",
            duration: 3000,
        });
    }

    // Function
    login(){
        if(this.userLogin.email != "" && this.userLogin.password != ""){
            this.authService.loginCustomer(this.userLogin).subscribe((res: Auth) =>{
                if(res!= null){
                    localStorage.setItem("CustomerData", JSON.stringify(res));
                    console.log('Login successfully', res);
                    this.saveAndCloseModal();
                }else{ // input sai email mật khẩu
                    this.msg = "Kiểm tra lại Email và Mật Khẩu"
                }

            })
        }else{
            this.msg = "Vui lòng nhập Email và Mật Khẩu để đăng nhập";
        }
    }

    // Navigate Tab
    goRegisterTab() {
        this.nextModal = "register";
    }
    goVerifyTab() {
        console.log("userRegister", this.userRegister);
        if(this.userRegister.password === this.comfirmPassword){
            this.authService.registerCustomer(this.userRegister).subscribe((res) =>{
                console.log('send mail successfully', res);
            });
            this.nextModal = "verify";
        }else{
            this.msg = "Xác nhận mật khẩu không khớp với mật khẩu"
        }

    }

    goLoginTab() {
        this.nextModal = "login";
    }
    goForgotPassword() {
        this.nextModal = "forgot";
    }

    async loginWithGoogle() {
        await this.firebaseService.loginWithGoogle().then((res) => {
            this.activeModal.close();
        });
    }

    public loginWithFacebook() {
        this.authenService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
}
