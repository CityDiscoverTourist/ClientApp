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

    // Call POST
    getToken(user) {
        const url =
            "https://citytourist.azurewebsites.net/api/v1/auths/login-firebase";

        return this.http.post<Auth>(url, user, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Accept: "text/plain",
            }),
        });
    }

    getIdTokenGoogle() {
        firebase.auth().onAuthStateChanged((res) => {
            res?.getIdToken()
                .then((idToken) => {
                    console.log("Token ID: ", idToken);
                    // const user = {
                    //     token: idToken,
                    // };
                    sessionStorage.setItem("tokenID", idToken);
                    this.user = {
                        tokenId: idToken,
                    };

                    this.getToken(this.user).subscribe((data: Auth) => {
                        // console.log("true");
                        console.log("get data from server", data);
                        localStorage.setItem("CustomerData", JSON.stringify(data));
                        localStorage.setItem("jwtToken", (!!data && !!data?.jwtToken) ? data?.jwtToken : undefined)
                        sessionStorage.setItem("SessionLogin", "yes");
                        let sessionLogin = sessionStorage.getItem("SessionLogin");
                        this.behaviorObject.getIsLogin(sessionLogin);
                    });

                    return idToken;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    async loginWithGoogle() {
        await this.firebaseAuth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                console.log("login successful");
                this.getIdTokenGoogle();
                this.successStase = true;
                if(this.language == "0"){
                    this.ngToastService.success({detail:"Message", summary:"Login with Google successfully", duration:3000})
                }else{
                    this.ngToastService.success({detail:"Thông báo", summary:"Đăng nhập Google thành công", duration:3000})
                }
                // this.behaviorObject.getIsLogin('logged');

            })
            .catch((err) => {
                console.log("Error while sign in ", err);
                this.successStase = false;
            });
    }


}
