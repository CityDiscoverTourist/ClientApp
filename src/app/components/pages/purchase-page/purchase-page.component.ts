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
    public questID : string = '';
    public quest : Quest[] = [];
    public cart;
    public today = new Date();
    // public a;
    constructor(private firebaseService: FirebaseService, private questService: QuestService) {}

    ngOnInit(): void {
        this.cart = JSON.parse(sessionStorage.getItem("cart"));

        this.quantity = this.cart.quantity;
        console.log('now', this.today.getDate()+'-'+(this.today.getMonth()+1)+'-'+this.today.getFullYear()+' '+this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds());
        this.questID = sessionStorage.getItem("questInfo")
        this.questService.getQuests(this.questID).subscribe((res: QuestPage) =>{
            this.quest = res.data;
            console.log("this.quest",this.quest);
            this.price = this.quest["price"];
            this.total = this.quantity * this.price;
        })


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

    }

    postCustomerQuest(){
        // Get CustomerID
        const customerData = localStorage.getItem("CustomerData");
        console.log("customerData ts", customerData);


        let cq : CustomerQuest;
        cq = {
            "id": 0,
            "beginPoint": "",
            "endPoint": "",
            "createdDate": String(Date.now()),
            "rating": 0,
            "feedBack": "",
            "customerId": "",
            "isFinished": false,
            "questId": 0,
            "status": "active",
            "paymentMethod": ""
        }

        // this.customerQuest.createCustomerQuest(){
        // }
    }
}
