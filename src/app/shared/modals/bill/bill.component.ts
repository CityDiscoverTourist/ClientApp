import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Auth } from "src/app/models/auth.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { QuestService } from "src/app/services/quest.service";

@Component({
    selector: "app-bill",
    templateUrl: "./bill.component.html",
    styleUrls: ["./bill.component.scss"],
})
export class BillComponent implements OnInit {
    public cart;
    public questID: string = "";
    public quest: Quest[] = [];
    public quantity: number = 1;
    public price: number = 0;
    public total: number = 0;
    public beginPoint: string;
    public customerData: Auth;
    constructor(
        public activeModal: NgbActiveModal,
        private questService: QuestService,
        private behaviorSubject: BehaviorsubjectService,

    ) {}

    ngOnInit(): void {
        this.cart = JSON.parse(sessionStorage.getItem("cart"));
        console.log('cart in bill', this.cart.quantity);

        this.questID = sessionStorage.getItem("questInfo");
        this.getQuest();
        this.getCustomerData();
        this.getQuantity();
        this.total = this.quantity * this.price;

    }

    getQuest() {
        // Get Quest
        this.questService
            .getQuests(this.questID)
            .subscribe((res: QuestPage) => {
                this.quest = res.data;
                console.log("this.quest", this.quest);
                this.price = this.quest["price"];
                this.total = this.quantity * this.price;
                this.beginPoint = String(this.quest["countQuestItem"] * 300);
                console.log("beginPoint", this.beginPoint);
            });

    }

    getCustomerData() {
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
    }

    getQuantity(){
        this.behaviorSubject.quantity$.subscribe(res =>{
        this.quantity = res;
        })
    }
}
