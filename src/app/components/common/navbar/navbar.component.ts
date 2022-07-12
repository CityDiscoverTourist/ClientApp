import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck,
    OnChanges,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { Auth } from "src/app/models/auth.model";
import { BehaviorsubjectService } from "src/app/services/behaviorsubject.service";
import { QuesttypeService } from "src/app/services/questtype.service";
import { BillComponent } from "src/app/shared/modals/bill/bill.component";
import { NavLoginComponent } from "src/app/shared/modals/nav-login/nav-login.component";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
    public langNumber;
    public langfixed;
    lessons: [];
    sessionLogin = null;
    customerData: Auth;

    constructor(
        private translateService: TranslateService,
        private questTypeService: QuesttypeService,
        private modalService: NgbModal,
        private behaviorObject: BehaviorsubjectService,
        private router: Router
    ) {}

    // public langNav$ = new BehaviorSubject<number>(null);

    ngOnInit(): void {
        this.langNumber = Number(localStorage.getItem("lang") || 1);
        this.questTypeService.getQuestTypes(this.langNumber);
        this.langfixed = localStorage.getItem("fixedlang") || "vi-VN";
        if (this.langfixed != null) {
            this.translateService.use(this.langfixed);
        }

        this.getSessionLogin();
    }

    getSessionLogin() {
        // Get lại Session sau khi Refresh web
        let sessionLoginTmp = sessionStorage.getItem("SessionLogin");
            this.behaviorObject.getIsLogin(sessionLoginTmp);
            this.behaviorObject.isLogin$.subscribe((res) => {
                this.sessionLogin = res;
                if (this.sessionLogin != null) {
                    this.customerData = JSON.parse(
                        localStorage.getItem("CustomerData")
                    );
                }
            });
            console.log("SessionLogin in Nav", this.sessionLogin);
    }

    changeLang(event: any) {
        // console.log('lang', event.target.value);
        if (event.target.value == "en-US") {
            this.langNumber = 0;
            this.questTypeService.getQuestTypes(this.langNumber);
        } else if (event.target.value == "vi-VN") {
            this.langNumber = 1;
            this.questTypeService.getQuestTypes(this.langNumber);
        }
        localStorage.setItem("lang", String(this.langNumber));
        this.langfixed = event.target.value;
        localStorage.setItem("fixedlang", this.langfixed);
        // reload
        window.location.reload();
    }

    openVerticallyCentered() {
        const modalRef = this.modalService.open(NavLoginComponent, {
            centered: true,
        });
    }

    logout() {
        sessionStorage.removeItem("SessionLogin");
        sessionStorage.removeItem("tokenID");
        localStorage.removeItem("CustomerData");
        localStorage.removeItem("jwtToken");

        this.router.navigate([""]).then(()=>window.location.reload()); // defalt page = home page

    }
    // isShow = false;
    // showLanguages(){
    //     if(!this.isShow){
    //         this.isShow = true;

    //     }
    //     else if(this.isShow){
    //         this.isShow = false;
    //     }
    //     console.log('isShow', this.isShow);

    // }

    manageAccount(){
        this.router.navigate(["account-setting"]);
    }
}
