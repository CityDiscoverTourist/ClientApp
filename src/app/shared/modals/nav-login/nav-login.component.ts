import {
    Component,
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
import { AccountRegistration, Auth, UserLogin } from "src/app/models/auth.model";
import { CustomerPage } from "src/app/models/customerPage.model";
import { CustomerQuest } from "src/app/models/customerQuest.model";
import { AuthService } from "src/app/services/auth.service";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { FacebookService } from "src/app/services/facebook.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public emailForgotPassword = "";

    userLogin : UserLogin = {
        email: "",
        password: "",
    };

    userRegister : AccountRegistration = {
        email: "",
        password: "",
    };
    public confirmPassword: "";

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
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.createFormLogin();
        this.createFormRegister();
        this.createFormForgotPassword();
    }
    // Validation

    // ============================ Form Login =================================
    formLogin!: FormGroup;
    createFormLogin() {
        const passwordPattern = "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\\W).*$";
        this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]]
        });
    }

    get emailLogin() {
        return this.formLogin.get('email');
    }
    get passwordLogin() {
        return this.formLogin.get('password');
    }
    // ============================ Form Register =================================
    formRegister!: FormGroup;
    createFormRegister() {
        const passwordPattern = "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\\W).*$";
        this.formRegister = this.fb.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]],
        passwordConfirm : ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]],
        });
    }
    get emailRegister() {
        return this.formRegister.get('email');
    }
    get passwordRegister() {
        return this.formRegister.get('password');
    }
    get passwordConfirmRegister() {
        return this.formRegister.get('passwordConfirm');
    }
    // ============================ Form Forgot Password =================================
    formForgotPassword!: FormGroup;
    createFormForgotPassword() {
        this.formForgotPassword = this.fb.group({
        email: ['', [Validators.required, Validators.email] ],
        });
    }
    get passwordForgeting(){
        return this.formForgotPassword.get('email');
    }


    // End Validation
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
                        this.ngToastService.success({
                            detail: "Thông báo",
                            summary: "Login Facebook thành công",
                            duration: 3000,
                        });
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
    }

    // Function
    msgAccountExist = "";
    login(){
        this.userLogin = {
            email: this.emailLogin.value,
            password: this.passwordLogin.value,
        }
        console.log("this.userLogin",this.userLogin);

        if(this.userLogin.email != "" && this.userLogin.password != ""){
            this.authService.loginCustomer(this.userLogin).subscribe(
                {
                    next :  (res: Auth) =>{
                        if(res!= null){
                            localStorage.setItem("CustomerData", JSON.stringify(res));
                            console.log('Login successfully', res);
                            this.saveAndCloseModal();
                            this.ngToastService.success({
                                detail: "Thông báo",
                                summary: "Login thành công",
                                duration: 3000,
                            });
                        }
                        },
                    error: (error : Error) => this.msgAccountExist = "Kiểm tra lại Email và Mật Khẩu"
                }
            );
        }else{
            this.msg = "Vui lòng nhập Email và Mật Khẩu để đăng nhập";
        }
    }

    msg_AccountStrange = "";
    forgotPassword(){
            this.emailForgotPassword = this.passwordForgeting.value;
            console.log("Forgot password", this.emailForgotPassword);

            this.authService.forgotPassword(this.emailForgotPassword).subscribe(
                {
                    next: (res) =>{
                        console.log("Reset Password successfully");
                        this.ngToastService.success({
                            detail: "Thông báo",
                            summary: "Gửi Mật Khẩu Mới thành công",
                            duration: 5000,
                        });
                        this.msg_AccountStrange = "";
                    },
                    error : (Error) =>{
                        if(Error.statusText == 'Internal Server Error') this.msg_AccountStrange = "*Email của bạn không có trên hệ thống.";
                    }
            })

    }

    // Navigate Tab
    goRegisterTab() {
        this.nextModal = "register";
    }
    // Register account
    msg_AccountExisted = "";
    goVerifyTab() {
        this.userRegister = {
            email: this.emailRegister.value,
            password: this.passwordRegister.value,
        };
        this.confirmPassword = this.passwordConfirmRegister.value;
        console.log("userRegister", this.userRegister);
        if(this.userRegister.password === this.confirmPassword){

            this.authService.registerCustomer(this.userRegister).subscribe({
                next: res =>{
                    console.log('send mail successfully', res);
                    this.nextModal = "verify";
                },
                error: (error : Error) => this.msg_AccountExisted = "*Tài khoản đã tồn tại trong hệ thống."
            });

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
