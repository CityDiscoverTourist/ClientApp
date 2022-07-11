import { Component, OnInit } from "@angular/core";
import { Auth } from "src/app/models/auth.model";
import { Payment, PaymentPage } from "src/app/models/payment.model";
import { Quest } from "src/app/models/quest.model";
import { PaymentService } from "src/app/services/payment.service";
import { QuestService } from "src/app/services/quest.service";


@Component({
    selector: "app-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.scss"],
})

export class HistoryComponent implements OnInit {
    public payments : Payment[];
    public quest: Quest;
    public questIDList = [];
    customerData: Auth;

    constructor(private paymentservice: PaymentService, private questService: QuestService) {}

    ngOnInit(): void {
        this.getPayment();
    }

    getPayment(){
        this.customerData = JSON.parse(localStorage.getItem("CustomerData"));
        if(this.customerData != null){
            this.paymentservice.getPaymentByCustomerId(this.customerData.accountId).subscribe((res: PaymentPage) =>{
                this.payments = res.data;
                this.questIDList = this.payments.filter(res => {return res.questId});
                console.log('this.questIDList',this.questIDList);

            })

        }
    }

    getQuestName(){

    }

    countries: Country[] = [
        {
          name: 'Russia',
          flag: 'f/f3/Flag_of_Russia.svg',
          area: 17075200,
          population: 146989754
        },
        {
          name: 'Canada',
          flag: 'c/cf/Flag_of_Canada.svg',
          area: 9976140,
          population: 36624199
        },
        {
          name: 'United States',
          flag: 'a/a4/Flag_of_the_United_States.svg',
          area: 9629091,
          population: 324459463
        },
        {
          name: 'China',
          flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
          area: 9596960,
          population: 1409517397
        }
      ];


}

interface Country {
    name: string;
    flag: string;
    area: number;
    population: number;
}
