import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BehaviorsubjectService {
    constructor() {}

    // Dùng SessionStorage để Kiểm tra xem User đã Login chưa Purchase Page
    public isLogin$ = new BehaviorSubject<any>(null);

    getIsLogin(res) {
        this.isLogin$.next(res);
    }

    // Quantity
    quantity$ = new BehaviorSubject<any>(null);
    getQuantity(res){
        this.quantity$.next(res);
    }
}
