import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Auth } from "src/app/models/auth.model";
import { Quest } from "src/app/models/quest.model";
import { QuestPage } from "src/app/models/questPage.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { PaymentService } from "src/app/services/payment.service";
import { Payment, VoucherChecking } from "src/app/models/payment.model";
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
    public total: number = 0;
    public totalSale : number = 0;
    public beginPoint: string;
    public customerData: Auth;

    public payment: Payment;
    public today = new Date();
    public uuid;
    // public voucher = "";
    public resVoucherChecking = {numOfDiscount : "", priceAfterChecking : ""};
    public voucherChecking : VoucherChecking;
    public isVoucher = false;

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
        this.getTotalSale();
        this.uuid = uuidv4();

        this.getVoucher();
    }

    getTotalSale(){ // khi có mã giảm giá
        this.resVoucherChecking = JSON.parse(sessionStorage.getItem("resVoucherChecking"));
        if(this.resVoucherChecking != null){
            this.isVoucher = true;
            this.total = Number(this.resVoucherChecking.priceAfterChecking);
        }else {this.isVoucher = false;}
    }

    getQuest() {
        // Get Quest & price
        this.questService
            .getQuests(this.questID)
            .subscribe((res: QuestPage) => {
                this.quest = res.data;

                this.resVoucherChecking = JSON.parse(sessionStorage.getItem("resVoucherChecking"));
                if(this.resVoucherChecking != null){
                    this.isVoucher = true;
                    this.total = Number(this.resVoucherChecking.priceAfterChecking);

                }else {
                    this.total = this.quantity * this.quest["price"];
                    this.isVoucher = false;
                }
                this.beginPoint = String(this.quest["countQuestItem"] * 300);
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
    getVoucher(){
        this.voucherChecking = JSON.parse(sessionStorage.getItem('voucherChecking'));
    }
    goMomo() {
        // get voucher
        this.payment = {
            id: this.uuid,
            quantity: this.quantity,
            totalAmount: this.total,
            customerId: this.customerData?.accountId,
            questId: this.quest["id"],
            questName: this.quest["title"],
        };


        // Insert Payment
        this.paymentService.createPayment
        (this.payment, this.voucherChecking?.couponCode == undefined ? '' : this.voucherChecking?.couponCode)
        .subscribe((res) => {
            let linkMomo = !!res && !!res.data[0] ? res.data[0] : undefined;
            //Navigate to momo gateway
            if (linkMomo != null) {
                sessionStorage.setItem("playingCode",this.uuid);
                window.location.href = linkMomo;
            }
        });
    }
}
