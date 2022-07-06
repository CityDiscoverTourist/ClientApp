import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BehaviorsubjectService {
    constructor() {}

    public isLogin$ = new BehaviorSubject<any>(null);

    getIsLogin(res){
        this.isLogin$.next(res);
    }
}
