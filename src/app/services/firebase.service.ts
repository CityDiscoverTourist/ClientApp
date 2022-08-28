import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
// Custom
import { AngularFireAuth } from "@angular/fire/auth";
import { Customer } from "../models/customer.model";
import { Auth } from "../models/auth.model";
import firebase from "firebase/app";
import { NgToastService } from "ng-angular-popup";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorsubjectService } from "./behaviorsubject.service";

@Injectable({
    providedIn: "root",
})
export class FirebaseService {
    // Login Google
    user:| {tokenId: string;}| any;
    private language = "";
    successStase: boolean = false;

    private jwtToken = "";
    private header : Object;

    constructor(
        private http: HttpClient,
        private ngToastService: NgToastService,
        private firebaseAuth: AngularFireAuth,
        private behaviorObject : BehaviorsubjectService

    ) {
        this.firebaseAuth.authState.subscribe((res) => {
            this.user = res;
        });
        // Get Language
        this.language = localStorage.getItem('lang');
    }

    getHeader(){
        this.jwtToken = localStorage.getItem("jwtToken");
        this.header = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        };
    }

    // Call POST
    getToken(user) {
        this.getHeader();
        const url =
            "https://citytourist.azurewebsites.net/api/v1/auths/login-firebase";

        return this.http.post<Auth>(url, user, this.header);
    }

    getIdTokenGoogle() {
        firebase.auth().onAuthStateChanged((res) => {
            res?.getIdToken()
                .then((idToken) => {

                    sessionStorage.setItem("tokenID", idToken);
                    this.user = {
                        tokenId: idToken,
                    };
                    // console.log('tokenID', idToken);
                    // console.log('tokenID', idToken.length);

                    this.getToken(this.user).subscribe({
                        next: data =>{
                            // console.log("get data from server", data);
                            localStorage.setItem("CustomerData", JSON.stringify(data));
                            localStorage.setItem("jwtToken", (!!data && !!data?.jwtToken) ? data?.jwtToken : undefined)
                            sessionStorage.setItem("SessionLogin", "yes");
                            let sessionLogin = sessionStorage.getItem("SessionLogin");
                            this.behaviorObject.getIsLogin(sessionLogin);
                            if(this.language == "0"){
                                this.ngToastService.success({detail:"Message", summary:"Login with Google successfully", duration:3000})
                            }else{
                                this.ngToastService.success({detail:"Thông báo", summary:"Đăng nhập Google thành công", duration:3000})
                            }
                        },
                        error: (Error) =>{
                            if(Error.error.message == 'Account not allowed to login'){
                                if(this.language == "0"){
                                    this.ngToastService.error({detail:"Thông báo", summary:"Your account has been locked!"})
                                }else{
                                    this.ngToastService.error({detail:"Thông báo", summary:"Tài khoản của bạn đã bị khóa!"})
                                }
                            }else if(Error.error.message == 'User is locked'){
                                if(this.language == "0"){
                                    this.ngToastService.error({detail:"Thông báo", summary:"Your account has been locked!"})
                                }else{
                                    this.ngToastService.error({detail:"Thông báo", summary:"Tài khoản của bạn đã bị khóa!"})
                                }
                            }

                        }

                    });

                    return idToken;
                })
                .catch((error) => {
                });
        });
    }

    async loginWithGoogle() {
        await this.firebaseAuth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                this.getIdTokenGoogle();
                this.successStase = true;

                // this.behaviorObject.getIsLogin('logged');

            })
            .catch((err) => {
                this.successStase = false;
            });
    }


}
