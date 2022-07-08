import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Auth } from "src/app/models/auth.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { PaymentService } from "src/app/services/payment.service";
import { Payment } from "src/app/models/payment.model";
import { QuestService } from "src/app/services/quest.service";
import { v4 as uuidv4 } from "uuid";

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

    public payment: Payment;
    public today = new Date();

    constructor(
        public activeModal: NgbActiveModal,
        private questService: QuestService,
        private behaviorSubject: BehaviorsubjectService,
        private paymentService: PaymentService
    ) {}

    ngOnInit(): void {
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

    getQuantity() {
        this.behaviorSubject.quantity$.subscribe((res) => {
            this.quantity = res;
        });
    }

    goMomo() {
        let uuid = uuidv4(); // uuid generator random
        this.payment = {
            id: uuid,
            quantity: this.quantity,
            totalAmount: this.total,
            customerId: this.customerData?.accountId,
            questId: this.quest["id"],
            questName: this.quest["title"],
        };
        console.log("this.payment", this.payment);
        // Insert Payment
        this.paymentService.createPayment(this.payment).subscribe((res) => {
            console.log("Payment Response", res);
            let linkMomo = !!res && !!res.data ? res.data : undefined;
            //Navigate to momo gateway
            if (linkMomo != null) {
                // sessionStorage.setItem("linkmomo", linkMomo);
                window.location.href = linkMomo;
            }
        });
    }
}
