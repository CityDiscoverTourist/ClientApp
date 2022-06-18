import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
// Custom
import { AngularFireAuth } from "@angular/fire/auth";
import { Customer } from "../models/customer.model";
import firebase from "firebase/app";
import { NgToastService } from "ng-angular-popup";

@Injectable({
    providedIn: "root",
})
export class FirebaseService {
    user:
        | {
              tokenId: string;
          }
        | any;
    successStase: boolean = false;

    constructor(
        private http: HttpClient,
        private ngToastService: NgToastService,
        private firebaseAuth: AngularFireAuth
    ) {
        this.firebaseAuth.authState.subscribe((res) => {
            this.user = res;
        });
    }

    // Call POST
    getToken(user) {
        const url =
            "https://citytourist.azurewebsites.net/api/v1/auths/login-firebase";

        return this.http.post(url, user, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Accept: "text/plain",
            }),
            responseType: "text",
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
                    this.getToken(this.user).subscribe((data: any) => {
                        // console.log("true");
                        console.log("get data from server", data);
                        localStorage.setItem("CustomerData", data);
                        // const obj = JSON.parse(data);
                        // sessionStorage.setItem("token", obj.token);

                        // this.modalService.open(
                        //     "Chào mừng bạn đã đến với CookBox"
                        // );
                        // this.router.navigate(["coming-soon-page"]);

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
                this.ngToastService.success({detail:"Thông báo", summary:"Đăng nhập thành công", duration:5000})

            })
            .catch((err) => {
                console.log("Error while sign in ", err);
                this.successStase = false;
            });
    }
}
