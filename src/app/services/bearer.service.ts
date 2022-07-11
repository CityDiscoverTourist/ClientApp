import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class BearerService {
    private jwtToken = "";
    constructor() {
    }

    getBearer() {
        this.jwtToken = localStorage.getItem("jwtToken");
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtToken}`,
            }),
        };
    }
}
