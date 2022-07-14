import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { Payment, PaymentPage } from "src/app/models/payment.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { PaymentService } from "src/app/services/payment.service";
import { QuestService } from "src/app/services/quest.service";


@Component({
    selector: "app-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.scss"],
})

export class HistoryComponent implements OnInit {
    public payments : Payment[];
    public quests: Quest[];
    public questID = "";
    customerData: Auth;

    constructor(private paymentservice: PaymentService, private questService: QuestService) {}

    ngOnInit(): void {
        this.getPayment();
        this.getQuestName();
    }

    getPayment(){
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
        if(this.customerData != null){
            this.paymentservice.getPaymentByCustomerId(this.customerData.accountId).subscribe((res: PaymentPage) =>{
                this.payments = (!!res && !!res.data) ? res.data : undefined
                this.questID = (!!res && !!res.data["questId"]) ? res.data["questId"] : undefined
                console.log('this.payments hisstory',this.payments);

            })

        }
    }

    getQuestName(){
        this.questService.getAllQuest().subscribe((res:QuestPage) =>{
            this.quests = res.data;
            console.log('this.quests history',this.quests);

        })
    }

}
